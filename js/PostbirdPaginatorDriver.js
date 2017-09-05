/**
     PostbirdPaginatorDriver 自动分页驱动
    功能：
        - 可以自动获取当前页，并进行响应式显示。
        - 不污染url，GET参数可正常再次传递
        - 可配置性高，多种显示选择
    Author:Postbird | http://www.ptbird.cn
    License:MIT
*/
var PostbirdPaginatorDriver = {
    init: function (paramObj) {
        this.pageBox = document.querySelector(paramObj.pageBox);// 存放分页的容器
        this.totalPage = paramObj.totalPage || 1; // 总页数 不传输为1
        this.currentPage = paramObj.currentPage || 1; // 当前页 可以通过currentPageBySelf 自动获取
        this.currentPageBySelf = paramObj.currentPageBySelf || true;// 是否自动获取当前页 依赖 pageParam
        this.pageMin = paramObj.pageMin || 5; // 最小显示长度 pageMin以下的链接全部打印
        this.url = paramObj.url || location.href; // url 需要构建分页的url，可待参数 在getBaseUrl()中处理
        this.pageParam = paramObj.pageParam || "page"; // 分页的url参数名 默认page
        this.pageClass = paramObj.pageClass || "page-item"; // 分页的li的class 默认page-item
        this.showPreviusNextPage = paramObj.showPreviusNextPage || true; // 是否显示前一页后一页
        this.showFirstLastPage = paramObj.showFirstLastPage || true;// 是否显示首页和尾页
        this.previusPageText = paramObj.previusPageText || '&laquo;';// 前一页的文字 可以是html代码
        this.nextPageText = paramObj.nextPageText || '&raquo;'; // 后一页的文字 可以是html代码
        this.firstPageText = paramObj.firstPageText || '首页'; // 首页文字
        this.lastPageText = paramObj.lastPageText || '尾页'; // 尾页文字
        this.side = paramObj.side || 3;// 间隔 用于处理分页，比如 当前页为7 则，会显示 2-5跨度和5-8跨度 不建议随意更改
        this.check();
        // 获取 baseurl
        this.baseUrl = this.getBaseUrl();
        console.log(this.currentPage);
        // 渲染分页内容
        this.renderPageHtml();
    },
    check: function () {
        // 检查是否需要自动获取currentPage
        if (this.currentPageBySelf) {
            // 自动获取后，会覆盖掉传递的currentPage
            this.currentPage = this.getCurrentPageBySelf();
        }
        // 进行检查和初始化工作 这里可以增加更多的检查机制
        if (this.currentPage > this.totalPage) {
            throw new Error("Error in check : currentPage must <= totalPage");
        }
        // 检查容器是否存在
        if (!this.pageBox) {
            throw new Error("Error in check : pageBox is not a valiable dom selector");
        }
    },
    getCurrentPageBySelf: function () {
        // 自动从参数列表中获取当前页 根据 this.pageParam 获取
        var reg = new RegExp("(^|&)" + this.pageParam + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            this.currentPage = parseInt(unescape(r[2]));
        } else {
            this.currentPage = 1;
        }
        return this.currentPage;
    },
    getPreviusPage: function () {
        // 获取前一页链接
        if (this.currentPage <= 1) {
            return this.getLinkHtml(1, this.previusPageText, 'disabled');
        }
        return this.getLinkHtml(this.currentPage - 1, this.previusPageText, 'normal');
    },
    getNextPage: function () {
        // 获取后一页链接
        if (this.currentPage == this.totalPage) {
            return this.getLinkHtml(this.totalPage, this.nextPageText, 'disabled');
        }
        return this.getLinkHtml(this.currentPage + 1, this.nextPageText
            , 'normal');
    },
    getFirstPage: function () {
        // 获取首页链接
        if (this.currentPage == 1) {
            return this.getLinkHtml(1, this.firstPageText, 'disabled');
        }
        return this.getLinkHtml(1, this.firstPageText
            , 'normal');
    },
    getLastPage: function () {
        // 获取尾页链接
        if (this.currentPage == this.totalPage) {
            return this.getLinkHtml(this.totalPage, this.lastPageText, 'disabled');
        }
        return this.getLinkHtml(this.totalPage, this.lastPageText
            , 'normal');
    },
    getLinkItemPages: function () {
        /**
        *   核心部分
        *   生成完整的链接列表（不包括首页、尾页、上一页和下一页）    
        */
        var links = '';
        // 涉及是否全部输出 还是响应的输出带...的链接 
        if (this.totalPage <= this.pageMin) {
            // 如果总页数小于最小长度，全部输出页码
            for (var i = 1; i <= this.totalPage; i++) {
                if (i == this.currentPage) {
                    links += this.getLinkHtml(i, i, 'active');
                } else {
                    links += this.getLinkHtml(i, i, 'normal');
                }
            }
            return links;
        } else {
            // 页面超出最小链接数 需要考虑 ... 的分配
            if (this.currentPage - this.side <= 1) {
                // 说明当前页在前side个链接中 直接输出 1 - side
                links += this.getUrlRangeLink(1, 1 + this.side);
                // 追加一个 ... 
                links += this.getLinkHtml('...', '...', 'disabled');
                // 输出最后一个link
                links += this.getLinkHtml(this.totalPage, this.totalPage, 'normal');
            } else if (this.currentPage + this.side >= this.totalPage) {
                // 说明当前页在后side个链接中 将后面的输出
                links += this.getLinkHtml(1, 1, 'normal');
                links += this.getLinkHtml('...', '...', 'disabled');
                // 获取从当前页到最后的链接列表
                links += this.getUrlRangeLink(this.totalPage - this.side, this.totalPage);
            } else {
                // 说明当前页既不在前side个链接 也不在后side个链接
                links += this.getLinkHtml(1, 1, 'normal');
                if (this.currentPage - this.side > 2) {
                    // 说明第一页和当前页的差距在 side 之外，应该加上...
                    // 追加一个 ... 
                    links += this.getLinkHtml('...', '...', 'disabled');
                }
                links += this.getUrlRangeLink(this.currentPage - this.side, this.currentPage + this.side - 1);
                links += this.getLinkHtml('...', '...', 'disabled');
                links += this.getUrlRangeLink(this.totalPage, this.totalPage, 'normal');
            }
            return links;
        }
    },
    getUrlRangeLink: function (start, stop) {
        // 获取某个范围的链接html代码 从 start - stop
        var linksHtml = '';
        if (start <= stop && start > 0) {
            for (var i = start; i <= stop; i++) {
                if (i == this.currentPage) {
                    linksHtml += this.getLinkHtml(i, i, 'active');
                } else {
                    linksHtml += this.getLinkHtml(i, i, 'normal');
                }
            }
            return linksHtml;
        }
        throw new Error('Error in getUrlRangeLink : start must <= stop');
    },
    getBaseUrl: function () {
        // 获取基础的baseURL,忽略掉page，page由代码添加
        // 其他参数不变
        var _this = this,
            urlArr = location.href.split("?"),
            urlParamStr = '';
        // 获取除了 page 之外的url参数 并进行拼接
        if (urlArr.length == 2) {
            urlArr[1].split("&").forEach(function (item) {
                var tmpArr = item.split("=");
                tmpArr[0] != _this.pageParam ? urlParamStr += tmpArr[0] + '=' + tmpArr[1] + '&' : false;
            });
        }
        // 拼接新的 baseURL 
        // 返回的形式是 http://url.com? 或者 http://url.com?name=ptbird&
        // - 返回形式分别针对 有参数和无参数两种情况
        return urlArr[0] + "?" + urlParamStr;
    },
    getLinkHtml: function (pageNum, text, status) {
        /** 
            获取分页链接的html代码 如果没配置pageClass返回的内容如下:
            有三种形式 active 、 disabled(href = javascript:void(0);)、normal
            <li class="page-item "><a href=".../?page=1">1</a></li>
            <li class="page-item active"><a href=".../?page=1">1</a></li>
            <li class="page-item disabled"><a href="javascript:void(0);">...</a></li>
        */
        status = status || 'normal'; // 表示是 disabled/acticve/normal
        var liHtml = '', href = '';
        switch (status) {
            case 'active':
                liHtml = '<li class="' + this.pageClass + ' active">';
                href = this.baseUrl + this.pageParam + '=' + pageNum;
                break;
            case 'disabled':
                liHtml = '<li class="' + this.pageClass + ' disabled">';
                href = "javascript:void(0);";
                break;
            default:
                liHtml = '<li class="' + this.pageClass + '">';
                href = this.baseUrl + this.pageParam + '=' + pageNum;
                break;
        }
        return liHtml + '<a href="' + href + '">' + text + '</a></li>';
    },
    renderPageHtml: function () {
        var htmPre = '', htmLast = '';
        // 渲染分页列表
        // 判断是否需要显示首页/尾页
        if (this.showFirstLastPage) {
            htmPre += this.getFirstPage();
            htmLast += this.getLastPage();
        }
        // 判断是否需要显示前一页和后一页
        if (this.showPreviusNextPage) {
            htmPre += this.getPreviusPage();
            htmLast = this.getNextPage() + htmLast; // 这里的顺序不一样
        }
        // 最终渲染
        this.pageBox.innerHTML = htmPre + this.getLinkItemPages() + htmLast;
    }
} 