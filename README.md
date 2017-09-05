# PostbirdPaginatorDriver.js
> JS 分页驱动

## 优点：
- 可以自动获取当前页，并进行响应式显示
- 不污染url，GET参数可正常再次传递
- 可配置性高，多种显示选择
## 使用方式：

### 1. 引入文件：
```
PostbirdPaginatorDriver.js
PostbirdPaginatorDriver.css
```
### 2. 需要一个存放分页的容器如：
```html
<ul id="pager"></ul>
```
## 3. 初始化驱动

```javascript
PostbirdPaginatorDriver.init({ pageBox: "#pager", totalPage: 25 });
```

## 配置选项：

<table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>意义</th>
                        <th>是否必须</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>pageBox</td>
                        <td>存放分页的容器选择器</td>
                        <td><code>是</code></td>
                    </tr>
                    <tr>
                        <td>totalPage</td>
                        <td>总页数 不传输默认为 1</td>
                        <td>否：但建议传输</td>
                    </tr>
                    <tr>
                        <td>currentPage</td>
                        <td>当前页</td>
                        <td>否 可以通过currentPageBySelf 自动获取</td>
                    </tr>
                    <tr>
                        <td>currentPageBySelf</td>
                        <td>是否自动获取当前页</td>
                        <td>否 默认true</td>
                    </tr>
                    <tr>
                        <td>pageMin</td>
                        <td>最小显示长度 分页数低于这个长度全部打印</td>
                        <td>否 默认 5</td>
                    </tr>
                    <tr>
                        <td>url</td>
                        <td>链接</td>
                        <td>否 默认为location.href</td>
                    </tr>
                    <tr>
                        <td>pageParam</td>
                        <td>分页参数名称</td>
                        <td>否 默认为page</td>
                    </tr>
                    <tr>
                        <td>pageClass</td>
                        <td>分页li的class name</td>
                        <td>否 默认为page-item</td>
                    </tr>
                    <tr>
                        <td>showPreviusNextPage</td>
                        <td>是否显示前一页后一页</td>
                        <td>否 默认为true</td>
                    </tr>
                    <tr>
                        <td>showFirstLastPage</td>
                        <td>是否显示首页和尾页</td>
                        <td>否 默认为true</td>
                    </tr>
                    <tr>
                        <td>previusPageText</td>
                        <td> 前一页的文字 可以是html代码</td>
                        <td>否 默认为 <code>&laquo;</code></td>
                    </tr>
                    <tr>
                        <td>nextPageText</td>
                        <td> 后一页的文字 可以是html代码</td>
                        <td>否 默认为 <code>&raquo;</code></td>
                    </tr>
                    <tr>
                        <td>firstPageText</td>
                        <td> 首页的文字 可以是html代码</td>
                        <td>否 默认为 <code>首页</code></td>
                    </tr>
                    <tr>
                        <td>lastPageText</td>
                        <td> 尾页的文字 可以是html代码</td>
                        <td>否 默认为 <code>尾页</code></td>
                    </tr>
                </tbody>
            </table>

## 效果：

<img src="./demo.jpg"/>
