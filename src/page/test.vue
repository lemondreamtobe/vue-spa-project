<template>
	<div id="test">
		<!-- <component-a></component-a>
		<component-a></component-a>
		<component-a></component-a>
		<componentb></componentb> -->

		<!-- 传入静态值 -->
		<!-- <blog-post postTitle="hello wolrd" ps="静态传入字符串"></blog-post>
		<blog-post postTitle="show" ps="静态传入字符串"></blog-post>
		<blog-post postTitle="2" ps="数字"></blog-post>
		<blog-post postTitle="[1,2,3,4,5, {}]" ps="静态传入数组"></blog-post>
		<blog-post postTitle="false" ps="静态传入布尔值"></blog-post>
		<blog-post postTitle="{a:1,b:2,c:3}" ps="静态传入对象"></blog-post> -->

		<!-- v-bind传入的是数据表达式 -->
		<!-- <blog-post v-bind:postTitle="title" ps="动态绑定属性"></blog-post>
         <transition
            name="custom-classes-transition"
            enter-active-class="animated tada"
            leave-active-class="animated bounceOutRight"
        >
		    <blog-show v-bind:show="show"></blog-show>
         </transition>
		<button @click="show = !show">切换</button>
		<blog-post v-bind:postTitle="obj" ps="动态绑定属性"></blog-post> -->

		<!-- 单项数据流 -->
		<!-- <blog-content content="单向数据流把传入的属性作为本地data保存" ps="也可以用复合属性保存"></blog-content> -->

        <!-- prop验证 -->
        <!-- <blog-yz v-bind:propA="propA" propB="2" propC="1" propF="success"></blog-yz>
        <base-input label="禁用特性继承" value="213" class="al" data-icon="icon" id="ad"></base-input> -->

         <button @click="show = !show">
                点击这里有惊喜
            </button>
            
            <div>
                <transition
                name="custom-classes-transition"
                enter-active-class="animated flip"
                leave-active-class="animated hinge"
                :duration="{ enter: 2500, leave: 2800 }"
            >
                <label v-if="show" style="text-align:center">hello world!</label>
                </transition>
            </div>
            
	</div>
</template>
<script>
	import Vue from "vue";

	//全局注册
	Vue.component('component-a', {
		data: function () {
			return {
				count: 0
			}
		},
		template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
	});

	//局部注册
	let componentb = {
		data: function () {
			return {
				count: 0
			}
		},
		template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
	};

	Vue.component('blog-post', {
		// 在 JavaScript 中是 camelCase 的
		props: ['postTitle', 'ps'],
		template: '<h3>{{ postTitle }} ,注明: <label style="color:red">{{ps}}</label></h3>'
	});
	Vue.component('blog-show', {
		// 在 JavaScript 中是 camelCase 的
		props: ['show'],
		template: ` <div>
                        <h3 v-if="show">1234567</h3>
                        <h3 v-if="!show">7654321</h3>
                    </div>
                  `
	});
	Vue.component('blog-content', {
		props: ['content', 'ps'],
		data() {
			return {
				blogContent: this.content,
			}
		},
		computed: {
			trnt() {
				return this.content.split('').reverse().join()
			}
		},
		template: `
                    <div>
                        <div style="text-align:center"> 
                            {{blogContent}},{{trnt}}, 注明：<label style="color:red">{{ps}}</label>
                        </div>
                    </div>
                  `
	});
	Vue.component('blog-yz', {
		props: {
			// 基础的类型检查 (`null` 匹配任何类型)
			propA: Number,
			// 多个可能的类型
			propB: [String, Number],
			// 必填的字符串
			propC: {
				type: String,
				required: true
			},
			// 带有默认值的数字
			propD: {
				type: Number,
				default: 100
			},
			// 带有默认值的对象
			propE: {
				type: Object,
				// 对象或数组且一定会从一个工厂函数返回默认值
				default: function () {
					return {
						message: 'hello'
					}
				}
			},
			// 自定义验证函数
			propF: {
                required: true,
				validator: function (value) {
					// 这个值必须匹配下列字符串中的一个
					return ['success', 'warning', 'danger'].indexOf(value) !== -1
				}
			}
		},
		template: `<div>
                        <label>{{propA}} : {{propB}} : {{propC}}:{{propD}}:{{propE}}:{{propF}}</label>                     
                    </div>`
    });
    Vue.component('base-input', {
        inheritAttrs: false,
        props: ['label', 'value'],
        template: `
            <label>
            {{ label }}
            <input
                v-bind="$attrs"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
            >
            </label>
        `
        })
	export default {
		components: {
			componentb
		},
		data() {
			return {
				title: 'world hello',
                show: true,
                propA: 1,
				obj: {
					a: 1,
					y: 2
				}
			}
		},
		created() {


		},
		methods: {

		}
	};

</script>

