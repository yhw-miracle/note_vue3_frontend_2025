import { uploadFileInChunks } from './upload'

const UPLOAD_URL = '/api/upload'; // 根据实际后端接口调整

const callbacks = {
    /**
     * 全局的URL处理器
     * @param {string} url 来源url
     * @param {'image'|'audio'|'video'|'autolink'|'link'} srcType 来源类型
     * @returns
     */
    urlProcessor: (url, srcType) => url,
    async fileUpload(file, callback) {
        if (/image|video/i.test(file.type)) {
            try {
                // 可选：可加 loading 状态
                const fileUrl = await uploadFileInChunks(file, UPLOAD_URL, 2 * 1024 * 1024, (progress) => {
                    // 可选：进度回调
                    // console.log('上传进度', progress);
                });
                // 图片/视频插入 markdown 内容
                if (/image/i.test(file.type)) {
                    callback(fileUrl, {
                        name: `${file.name.replace(/\.[^.]+$/, '')}`,
                        isShadow: true,
                        width: '60%',
                        height: 'auto',
                    });
                } else if (/video/i.test(file.type)) {
                    callback(fileUrl, {
                        name: `${file.name.replace(/\.[^.]+$/, '')}`,
                        poster: fileUrl + '?poster=true',
                        isBorder: true,
                        isShadow: true,
                        isRadius: true,
                    });
                }
            } catch (e) {
                // 上传失败，回退默认图片
                callback('images/demo-dog.png');
            }
        } else {
            callback('images/demo-dog.png');
        }
    },
    afterChange: (text, html) => { },
    afterInit: (text, html) => { },
    onClickPreview: (event) => { },
    onExpandCode: (event, code) => {
        // 阻止默认的粘贴事件
        // return false;
        // 对复制内容进行额外处理
        // console.log(event, code);
        return code;
    },
    onUnExpandCode: (event, code) => {
        // 阻止默认的粘贴事件
        // return false;
        // 对复制内容进行额外处理
        // console.log(event, code);
        return code;
    },
    /**
     * 粘贴时触发
     * @param {ClipboardEvent['clipboardData']} clipboardData
     * @param {object} cherry
     * @returns
     *    false: 走cherry粘贴的默认逻辑
     *    string: 直接粘贴的内容
     */
    onPaste: (clipboardData, cherry) => {
        return false;
    },
    onCopyCode: (event, code) => {
        // 阻止默认的粘贴事件
        // return false;
        // 对复制内容进行额外处理
        return code;
    },
}

const cherryEditorConfig = {
    id: 'markdown-editor',
    value: "# 写点什么......",
    engine: {
        global: {
            // 是否启用经典换行逻辑
            // true：一个换行会被忽略，两个以上连续换行会分割成段落，
            // false： 一个换行会转成<br>，两个连续换行会分割成段落，三个以上连续换行会转成<br>并分割段落
            classicBr: false,
            /**
             * 适配流式会话的场景，开启后将具备以下特性：
             * - cherry渲染频率从50ms/次提升到10ms/次
             * - 代码块自动闭合，相当于强制 `engine.syntax.codeBlock.selfClosing=true`
             * - 文章末尾的段横线标题语法（`\n-`）失效
             * - 表格语法自动闭合，相当于强制`engine.syntax.table.selfClosing=true`
             * - 加粗、斜体语法自动闭合，相当于强制`engine.syntax.fontEmphasis.selfClosing=true`
             */
            flowSessionContext: true,
        },
        syntax: {
            link: {
                target: "_blank", // 链接打开方式
                // rel: "noopener noreferrer" // 安全性
                rel: ""
            },
            list: {
                indentSpace: 4, // 列表缩进空格数
            },
            codeBlock: {
                wrap: true, // 是否换行
                lineNumber: true, // 是否显示行号
                copyCode: true, // 是否显示复制按钮
                editCode: true, // 是否显示编辑按钮
                changeLang: true, // 是否显示语言选择
                expandCode: true, // 是否显示展开按钮
                selfClosing: true, // 是否自动闭合
            },
            emoji: {
                useUnicode: true, // 是否使用unicode表情
            }
        }
    },
    editor: {
        height: '100%',
        // defaultModel 编辑器初始化后的默认模式，一共有三种模式：1、双栏编辑预览模式；2、纯编辑模式；3、预览模式
        // edit&preview: 双栏编辑预览模式
        // editOnly: 纯编辑模式（没有预览，可通过toolbar切换成双栏或预览模式）
        // previewOnly: 预览模式（没有编辑框，toolbar只显示“返回编辑”按钮，可通过toolbar切换成编辑模式）
        defaultModel: "edit&preview",
        keepDocumentScrollAfterInit: false, // 在初始化后是否保持网页的滚动，true：保持滚动；false：网页自动滚动到cherry初始化的位置
        showFullWidthMark: true, // 是否高亮全角符号 ·|￥|、|：|“|”|【|】|（|）|《|》
        showSuggestList: true, // 是否显示联想框
    },
    toolbars: {
        toolbar: [
            'bold', 'italic', 'strikethrough', '|',
            'header', 'list', 'checklist', '|',
            'link', 'image', 'video', 'table', '|',
            'code'
        ]
    },
    callback: {
        /**
         * 全局的URL处理器
         * @param {string} url 来源url
         * @param {'image'|'audio'|'video'|'autolink'|'link'} srcType 来源类型
         * @returns
         */
        urlProcessor: callbacks.urlProcessor,
        // 上传文件的回调
        fileUpload: callbacks.fileUpload,
        // 预览区域点击事件
        onClickPreview: callbacks.onClickPreview,
        // 复制代码块代码时的回调
        onCopyCode: callbacks.onCopyCode,
        // 展开代码块代码时的回调
        onExpandCode: callbacks.onExpandCode,
        // 缩起代码块代码时的回调
        onUnExpandCode: callbacks.onUnExpandCode,
        /**
         * 粘贴时触发
         * @param {ClipboardEvent['clipboardData']} clipboardData
         * @param {Cherry} cherry
         * @returns
         *    false: 走cherry粘贴的默认逻辑
         *    string: 直接粘贴的内容
         */
        onPaste: callbacks.onPaste,
    },
    event: {
        // 当编辑区内容有实际变化时触发
        afterChange: callbacks.afterChange,
        afterInit: callbacks.afterInit,
        focus: ({ e, cherry }) => { },
        blur: ({ e, cherry }) => { },
        selectionChange: ({ selections, lastSelections, info }) => { },
        afterChangeLocale: (locale) => { },
        changeMainTheme: (theme) => { },
        changeCodeBlockTheme: (theme) => { },
    },
    previewer: {
        dom: false,
        className: 'cherry-markdown',
        // 是否启用预览区域编辑能力（目前支持编辑图片尺寸、编辑表格内容）
        enablePreviewerBubble: true,
        floatWhenClosePreviewer: false,
        /**
         * 配置图片懒加载的逻辑
         * - 如果不希望图片懒加载，可配置成 lazyLoadImg = {noLoadImgNum: -1}
         * - 如果希望所有图片都无脑懒加载，可配置成 lazyLoadImg = {noLoadImgNum: 0, autoLoadImgNum: -1}
         * - 如果一共有15张图片，希望：
         *    1、前5张图片（1~5）直接加载；
         *    2、后5张图片（6~10）不论在不在视区内，都无脑懒加载；
         *    3、其他图片（11~15）在视区内时，进行懒加载；
         *    则配置应该为：lazyLoadImg = {noLoadImgNum: 5, autoLoadImgNum: 5}
         */
        lazyLoadImg: {
            // 加载图片时如果需要展示loading图，则配置loading图的地址
            loadingImgPath: '',
            // 同一时间最多有几个图片请求，最大同时加载6张图片
            maxNumPerTime: 2,
            // 不进行懒加载处理的图片数量，如果为0，即所有图片都进行懒加载处理， 如果设置为-1，则所有图片都不进行懒加载处理
            noLoadImgNum: 5,
            // 首次自动加载几张图片（不论图片是否滚动到视野内），autoLoadImgNum = -1 表示会自动加载完所有图片
            autoLoadImgNum: 5,
            // 针对加载失败的图片 或 beforeLoadOneImgCallback 返回false 的图片，最多尝试加载几次，为了防止死循环，最多5次。以图片的src为纬度统计重试次数
            maxTryTimesPerSrc: 2,
            // 加载一张图片之前的回调函数，函数return false 会终止加载操作
            beforeLoadOneImgCallback: (img) => {
                return true;
            },
            // 加载一张图片失败之后的回调函数
            failLoadOneImgCallback: (img) => { },
            // 加载一张图片之后的回调函数，如果图片加载失败，则不会回调该函数
            afterLoadOneImgCallback: (img) => { },
            // 加载完所有图片后调用的回调函数
            afterLoadAllImgCallback: () => { },
        },
    },
    /** 定义cherry缓存的作用范围，相同nameSpace的实例共享localStorage缓存 */
    nameSpace: 'cherry',
    themeSettings: {
        // 主题列表，用于切换主题
        themeList: [
            { className: 'default', label: '默认' },
            { className: 'dark', label: '暗黑' },
            { className: 'light', label: '明亮' },
            { className: 'green', label: '清新' },
            { className: 'red', label: '热情' },
            { className: 'violet', label: '淡雅' },
            { className: 'blue', label: '清幽' },
        ],
        mainTheme: 'light',
        codeBlockTheme: 'default',
        inlineCodeTheme: 'red', // red or black
        toolbarTheme: 'dark', // light or dark 优先级低于mainTheme
    },
    // 预览页面不需要绑定事件
    isPreviewOnly: false,
    // 预览区域跟随编辑器光标自动滚动
    autoScrollByCursor: true,
    // 外层容器不存在时，是否强制输出到body上
    forceAppend: true,
    // The locale Cherry is going to use. Locales live in /src/locales/
    locale: 'zh_CN',
    // Supplementary locales
    locales: {},
    // cherry初始化后是否检查 location.hash 尝试滚动到对应位置
    autoScrollByHashAfterInit: false
}

export default cherryEditorConfig
