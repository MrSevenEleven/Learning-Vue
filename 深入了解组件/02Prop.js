// Prop 的大小写 (camelCase vs kebab-case)
    // HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。
    // 这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
    //     Vue.component('blog-post', {
    //         // 在 JavaScript 中是 camelCase 的
    //         props: ['postTitle'],
    //         template: '<h3>{{ postTitle }}</h3>'
    //     })

    // <!-- 在 HTML 中是 kebab-case 的 -->
    // <blog-post post-title="hello!"></blog-post>

// Prop 类型
    // 到这里，我们只看到了以字符串数组形式列出的 prop：
        // props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
    // 但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型：
        // props: {
        //     title: String,
        //         likes: Number,
        //         isPublished: Boolean,
        //         commentIds: Array,
        //         author: Object,
        //         callback: Function,
        //         contactsPromise: Promise // or any other constructor
        // }

// 传递静态或动态 Prop
    // 像这样，你已经知道了可以像这样给 prop 传入一个静态的值：
        // <blog-post title="My journey with Vue"></blog-post>
    // 你也知道 prop 可以通过 v-bind 动态赋值，例如：
        // <!-- 动态赋予一个变量的值 -->
        // <blog-post v-bind:title="post.title"></blog-post>
        //
        //     <!-- 动态赋予一个复杂表达式的值 -->
        //     <blog-post
        // v-bind:title="post.title + ' by ' + post.author.name"
        //     ></blog-post>

    // 在上述两个示例中，我们传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。
        // 传入一个数字
            // <!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
            // <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
            // <blog-post v-bind:likes="42"></blog-post>
            //
            //     <!-- 用一个变量进行动态赋值。-->
            //     <blog-post v-bind:likes="post.likes"></blog-post>
        // 传入一个布尔值
            // <!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
            // <blog-post is-published></blog-post>
            //
            // <!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
            // <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
            // <blog-post v-bind:is-published="false"></blog-post>
            //
            //<!-- 用一个变量进行动态赋值。-->
            //<blog-post v-bind:is-published="post.isPublished"></blog-post>
        // 传入一个数组
            // <!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
            // <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
            // <blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
            //
            //     <!-- 用一个变量进行动态赋值。-->
            //     <blog-post v-bind:comment-ids="post.commentIds"></blog-post>
        // 传入一个对象
            // <!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
            // <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
            // <blog-post
            // v-bind:author="{
            // name: 'Veronica',
            //     company: 'Veridian Dynamics'
            // }"
            // ></blog-post>
            //
            // <!-- 用一个变量进行动态赋值。-->
            // <blog-post v-bind:author="post.author"></blog-post>
        // 传入一个对象的所有属性
            // 如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind (取代 v-bind:prop-name)。例如，对于一个给定的对象 post：
                // post: {
                //     id: 1,
                //         title: 'My Journey with Vue'
                // }
                // <blog-post v-bind="post"></blog-post>
                // 等价于
                // <blog-post
                // v-bind:id="post.id"
                // v-bind:title="post.title"
                //     ></blog-post>

// 单向数据流
    // 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
    // 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
    // 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。
    // 如果你这样做了，Vue 会在浏览器的控制台中发出警告。

// Prop 验证
    // 我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。
        // Vue.component('my-component', {
        //     props: {
        //         // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
        //         propA: Number,
        //         // 多个可能的类型
        //         propB: [String, Number],
        //         // 必填的字符串
        //         propC: {
        //             type: String,
        //             required: true
        //         },
        //         // 带有默认值的数字
        //         propD: {
        //             type: Number,
        //             default: 100
        //         },
        //         // 带有默认值的对象
        //         propE: {
        //             type: Object,
        //             // 对象或数组默认值必须从一个工厂函数获取
        //             default: function () {
        //                 return { message: 'hello' }
        //             }
        //         },
        //         // 自定义验证函数
        //         propF: {
        //             validator: function (value) {
        //                 // 这个值必须匹配下列字符串中的一个
        //                 return ['success', 'warning', 'danger'].indexOf(value) !== -1
        //             }
        //         }
        //     }
        // })
    // 类型检查
        // type 可以是下列原生构造函数中的一个：
        //
        // String
        // Number
        // Boolean
        // Array
        // Object
        // Date
        // Function
        // Symbol
    // 额外的，type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认。例如，给定下列现成的构造函数：
        // function Person (firstName, lastName) {
        //     this.firstName = firstName
        //     this.lastName = lastName
        // }
    // 你可以使用：
        //
        // Vue.component('blog-post', {
        //     props: {
        //         author: Person
        //     }
        // })
    // 来验证 author prop 的值是否是通过 new Person 创建的。

// 非 Prop 的特性
    // 一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。
    // 因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的特性，而这些特性会被添加到这个组件的根元素上。

    // 替换/合并已有的特性
    // 禁用特性继承
        // 如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false。
            // Vue.component('my-component', {
            //     inheritAttrs: false,
            //     // ...
            // })
        // 这尤其适合配合实例的 $attrs 属性使用，该属性包含了传递给一个组件的特性名和特性值，例如：
            // {
            //     required: true,
            //         placeholder: 'Enter your username'
            // }
        // 有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些特性会被赋予哪个元素。






    Vue.component("blog-past",{
        props:["postTitle"],
        template:"<h3>{{postTitle}}</h3>",
    });



