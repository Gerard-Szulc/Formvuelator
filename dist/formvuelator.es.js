var e=Object.assign;import{defineComponent as l,toRefs as a,openBlock as d,createBlock as n,createTextVNode as o,toDisplayString as t,createVNode as h,withModifiers as m,withScopeId as r,withDirectives as u,vModelText as s,pushScopeId as i,popScopeId as c,Fragment as p,renderList as g,renderSlot as I,resolveComponent as v,createCommentVNode as M}from"vue";var y=l({name:"FormInput",props:{model:{required:!0},schema:{required:!0},id:{type:String,required:!0}},setup(e,l){const{model:d,schema:n,id:o}=a(e);return{handleBlur:e=>{l.emit("blur",{value:e.target.value,model:d,schema:n,id:o,originalEvent:e})},handleChange:e=>{l.emit("change-model",{value:e.target.value,model:d,schema:n,id:o,originalEvent:e})},handleInput:e=>{l.emit("input",{value:e.target.value,model:d,schema:n,id:o,originalEvent:e})}}}});const C=r("data-v-b676277e")(((e,l,a,r,u,s)=>(d(),n("label",{for:e.id},[o(t(e.schema.label||"")+" ",1),h("input",{id:e.id,type:e.schema.subtype||"text",value:e.model[e.schema.model],onBlur:l[1]||(l[1]=(...l)=>e.handleBlur&&e.handleBlur(...l)),onChange:l[2]||(l[2]=(...l)=>e.handleChange&&e.handleChange(...l)),onInput:l[3]||(l[3]=m(((...l)=>e.handleInput&&e.handleInput(...l)),["stop"]))},null,40,["id","type","value"])],8,["for"]))));y.render=C,y.__scopeId="data-v-b676277e";var b=l({name:"FormTextarea",props:{model:{required:!0},schema:{required:!0},id:{type:String,required:!0}}});const B=r("data-v-54e601bc")(((e,l,a,m,r,i)=>(d(),n("label",{for:e.id},[o(t(e.schema.label||"")+" ",1),u(h("textarea",{id:e.id,"onUpdate:modelValue":l[1]||(l[1]=l=>e.model[e.schema.model]=l)},null,8,["id"]),[[s,e.model[e.schema.model]]])],8,["for"]))));b.render=B,b.__scopeId="data-v-54e601bc";var $=l({name:"FormGroup",components:{},props:{schema:{},model:{},id:{}},computed:{},methods:{localFieldModel(e){return this.model.hasOwnProperty(this.schema.model)&&this.model[this.schema.model][e]||{}},localModel(){return this.model.hasOwnProperty(this.schema.model)&&0!==this.model[this.schema.model].length?this.model[this.schema.model]:[{}]},handleBlur(l){this.$emit("blur",e(e({},l),{groupModel:this.schema.model}))},handleChange(l){this.$emit("change-model",e(e({},l),{groupModel:this.schema.model}))},handleInput(l){this.$emit("input",e(e({},l),{groupModel:this.schema.model}))}}});const f=r("data-v-67a2e95e");i("data-v-67a2e95e");const x={class:"form-group"};c();const q=f(((e,l,a,h,m,r)=>(d(),n("div",x,[o(t(e.schema.label||"")+" ",1),(d(!0),n(p,null,g(e.localModel(),((a,h)=>(d(),n(p,null,[(d(!0),n(p,null,g(e.schema.items,(a=>(d(),n("div",{key:`group-${h}`,id:`${h}-${a.model}`},[o(t(a.model+a.type)+" ",1),I(e.$slots,"field",{id:`${e.id}-${a.model}-${h}`,model:e.localFieldModel(h),schema:a,index:h,onBlur:l[1]||(l[1]=(...l)=>e.handleBlur&&e.handleBlur(...l)),onChangeModel:l[2]||(l[2]=(...l)=>e.handleChange&&e.handleChange(...l)),onInput:l[3]||(l[3]=(...l)=>e.handleInput&&e.handleInput(...l))})],8,["id"])))),128)),I(e.$slots,"button",{index:h})],64)))),256))]))));$.render=q,$.__scopeId="data-v-67a2e95e";var G=l({name:"FormSelect",props:{model:{required:!0},schema:{required:!0},id:{type:String,required:!0}},setup(e,l){const{model:d,schema:n,id:o}=a(e),t=e=>Array(...e.target.options).reduce(((e,l)=>(!0===l.selected&&e.push((e=>{if(!n.multipleByKey){let l={};return l[n.optionValueKey||"value"]=e[n.optionValueKey||"value"],l[n.optionLabelKey||"label"]=e[n.optionLabelKey||"label"],l}return e[n.optionValueKey||"value"]})(l)),e)),[]),h=e=>n.multiple?t(e):e.target.value,m=(e,a)=>{l.emit(e,{value:h(a),model:d,schema:n,id:o,originalEvent:a})};return{handleBlur:e=>{m("blur",e)},handleChange:e=>{m("change-model",e)},handleInput:e=>{m("input",e)}}}});const P=r("data-v-2fc302d9")(((e,l,a,m,r,u)=>(d(),n("label",{for:e.id},[o(t(e.schema.label||"")+" ",1),h("select",{id:e.id,value:e.model[e.schema.model],name:e.schema.name,size:e.schema.size,multiple:e.schema.multiple,disabled:e.schema.disabled,required:e.schema.required,onBlur:l[1]||(l[1]=(...l)=>e.handleBlur&&e.handleBlur(...l)),onChange:l[2]||(l[2]=(...l)=>e.handleChange&&e.handleChange(...l)),onInput:l[3]||(l[3]=(...l)=>e.handleInput&&e.handleInput(...l))},[(d(!0),n(p,null,g(e.schema.options,(l=>(d(),n("option",{key:`${e.id}-${e.schema.model}-${l[e.schema.optionValueKey||"value"]}`,value:l[e.schema.optionValueKey||"value"],selected:l.selected},t(l[e.schema.optionLabelKey||"label"]),9,["value","selected"])))),128))],40,["id","value","name","size","multiple","disabled","required"])],8,["for"]))));G.render=P,G.__scopeId="data-v-2fc302d9";var F=l({name:"FormField",components:{FormSelect:G,FormGroup:$,FormTextarea:b,FormInput:y},props:{model:{required:!0},schema:{required:!0},id:{type:String,required:!0}},mounted(){},methods:{handleInputBlur(e){this.$emit("blur",e)},handleChange(e){this.$emit("change-model",e)},handleInput(e){this.$emit("input",e)},handleInputGroupBlur(e,l,a){e.schemaModelPath=[l.model,...e.schemaModelPath||[]],e.schemaModelIndex=[a.index,...e.schemaModelIndex||[]],this.$emit("blur",e,l,a)},handleGroupChange(e,l,a){e.schemaModelPath=[l.model,...e.schemaModelPath||[]],e.schemaModelIndex=[a.index,...e.schemaModelIndex||[]],this.$emit("change-model",e,l,a)},handleGroupInput(e,l,a){e.schemaModelPath=[l.model,...e.schemaModelPath||[]],e.schemaModelIndex=[a.index,...e.schemaModelIndex||[]],this.$emit("input",e,l,a)},addGroupElement(e,l,a){e.schemaModelPath=[l.model,...e.schemaModelPath||[]],e.schemaModelIndex=[a.index,...e.schemaModelIndex||[]],this.$emit("add-group-element",e,l,a)}}});const k=r("data-v-21326d0b");i("data-v-21326d0b");const _={class:"form-field"};c();const E=k(((e,l,a,o,t,m)=>{const r=v("form-input"),u=v("form-textarea"),s=v("form-select"),i=v("_self"),c=v("form-group");return d(),n("div",_,["input"===e.schema.type?(d(),n(r,{key:0,id:`${e.id}-${e.schema.model}`,model:e.model,schema:e.schema,onBlur:e.handleInputBlur,onChangeModel:e.handleChange,onInput:e.handleInput},null,8,["id","model","schema","onBlur","onChangeModel","onInput"])):M("",!0),"textarea"===e.schema.type?(d(),n(u,{key:1,id:`${e.id}-${e.schema.model}`,model:e.model,schema:e.schema,onBlur:e.handleInputBlur,onChangeModel:e.handleChange,onInput:e.handleInput},null,8,["id","model","schema","onBlur","onChangeModel","onInput"])):M("",!0),"select"===e.schema.type?(d(),n(s,{key:2,id:`${e.id}-${e.schema.model}`,model:e.model,schema:e.schema,onBlur:e.handleInputBlur,onChangeModel:e.handleChange,onInput:e.handleInput},null,8,["id","model","schema","onBlur","onChangeModel","onInput"])):M("",!0),"group"===e.schema.type?(d(),n(c,{key:3,model:e.model,schema:e.schema,id:`${e.id}-${e.schema.model}`,onBlur:e.handleInputBlur,onChangeModel:e.handleChange,onInput:e.handleInput},{field:k((l=>[h(i,{id:l.id,model:l.model,schema:l.schema,onBlur:a=>e.handleInputGroupBlur(a,e.schema,l),onChangeModel:a=>e.handleGroupChange(a,e.schema,l),onInput:a=>e.handleGroupInput(a,e.schema,l),onAddGroupElement:a=>e.addGroupElement(a,e.schema,l)},null,8,["id","model","schema","onBlur","onChangeModel","onInput","onAddGroupElement"])])),button:k((l=>[h("button",{onClick:()=>e.addGroupElement({},e.schema,l)},"add",8,["onClick"])])),_:1},8,["model","schema","id","onBlur","onChangeModel","onInput"])):M("",!0)])}));F.render=E,F.__scopeId="data-v-21326d0b";var A=l({name:"FormVuelator",components:{FormField:F},props:{model:{required:!0},schema:{required:!0}},emits:["change-model"],setup:(l,d)=>{const{model:n,schema:o,id:t}=a(l),h=(l,a,d,n,o)=>{let t,m;[t,...a]=a,[m,...d]=d;let r={};t&&0===a.length&&(r[n]=o.value),l.hasOwnProperty(t)?l[t][m]?l[t][m]=e(e({},l[t][m]),r):Array.isArray(l[t])?l[t].push(r):l[t]=[].push(r):(l[t]=[],l[t].hasOwnProperty(m)?l[t]=[].push(r):l[t][m]=r),0!==a.length?h(l[t][m],a,d,n,o):l[t][m]=e(e({},l[t][m]),r)};return{model:n,schema:o,handleClick:()=>{console.log(JSON.parse(JSON.stringify(n.value)))},handleBlur:e=>{console.log("blur",e)},handleChange:e=>{console.log("change",e)},handleInput:e=>{let l=n.value,a=e.schema.value.model;e.hasOwnProperty("schemaModelPath")&&e.hasOwnProperty("schemaModelIndex")?h(n.value,e.schemaModelPath,e.schemaModelIndex,a,e):(l[a]=e.value,d.emit("change-model",l,e.schema.value))},handleAddGroup:e=>{console.log("add",e),e.schemaModelPath,e.schemaModelIndex},id:t}}});A.render=function(e,l,a,o,t,r){const u=v("form-field");return d(),n(p,null,[h("button",{onClick:l[1]||(l[1]=m(((...l)=>e.handleClick&&e.handleClick(...l)),["prevent"]))}),(d(!0),n(p,null,g(e.schema,((l,a)=>(d(),n("div",{key:`root-field-${a}`},[h(u,{model:e.model,schema:l,id:l.model,onBlur:e.handleBlur,onChangeModel:e.handleChange,onInput:e.handleInput,onAddGroupElement:e.handleAddGroup},null,8,["model","schema","id","onBlur","onChangeModel","onInput","onAddGroupElement"])])))),128))],64)};export{A as FormVueLator};
