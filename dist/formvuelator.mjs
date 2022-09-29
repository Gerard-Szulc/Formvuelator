import { defineComponent as b, toRefs as V, openBlock as h, createElementBlock as p, normalizeClass as I, createElementVNode as B, toDisplayString as C, withModifiers as j, createTextVNode as w, Fragment as E, renderList as q, renderSlot as k, createCommentVNode as O, resolveComponent as y, createBlock as G, withCtx as A, createVNode as P } from "vue";
const K = b({
  name: "FormInput",
  props: {
    model: {
      type: Object,
      default: () => ({}),
      required: !0
    },
    schema: {
      type: Object,
      default: () => ({}),
      required: !0
    },
    id: {
      type: String,
      required: !0
    }
  },
  setup(e, l) {
    const { model: a, schema: s, id: u } = V(e);
    return { handleBlur: (m) => {
      l.emit("blured", { value: m.target.value, model: a, schema: s, id: u, originalEvent: m });
    }, handleChange: (m) => {
      l.emit("change-model", { value: m.target.value, model: a, schema: s, id: u, originalEvent: m });
    }, handleInput: (m) => {
      l.emit("form-input", { value: m.target.value, model: a, schema: s, id: u, originalEvent: m });
    } };
  }
}), M = (e, l) => {
  const a = e.__vccOpts || e;
  for (const [s, u] of l)
    a[s] = u;
  return a;
}, S = ["for"], N = ["id", "type", "value"];
function z(e, l, a, s, u, c) {
  return h(), p("div", {
    class: I(e.schema.classes && e.schema.classes.fieldContainer || "")
  }, [
    B("label", {
      for: e.id,
      class: I(e.schema.classes && e.schema.classes.label || "")
    }, C(e.schema.label || ""), 11, S),
    B("input", {
      id: e.id,
      type: e.schema.subtype || "text",
      value: e.model[e.schema.model],
      onBlur: l[0] || (l[0] = (...d) => e.handleBlur && e.handleBlur(...d)),
      onChange: l[1] || (l[1] = (...d) => e.handleChange && e.handleChange(...d)),
      onInput: l[2] || (l[2] = j((...d) => e.handleInput && e.handleInput(...d), ["stop"])),
      class: I(e.schema.classes && e.schema.classes.field || "")
    }, null, 42, N)
  ], 2);
}
const L = /* @__PURE__ */ M(K, [["render", z]]), D = b({
  name: "FormTextarea",
  props: {
    model: { required: !0, type: Object },
    schema: { required: !0, type: Object },
    id: {
      type: String,
      required: !0
    }
  },
  setup(e, l) {
    const { model: a, schema: s, id: u } = V(e);
    return { handleBlur: (m) => {
      l.emit("blured", { value: m.target.value, model: a, schema: s, id: u, originalEvent: m });
    }, handleChange: (m) => {
      l.emit("change-model", { value: m.target.value, model: a, schema: s, id: u, originalEvent: m });
    }, handleInput: (m) => {
      l.emit("form-input", { value: m.target.value, model: a, schema: s, id: u, originalEvent: m });
    } };
  }
}), T = ["for"], R = ["id", "value"];
function H(e, l, a, s, u, c) {
  return h(), p("div", {
    class: I(e.schema.classes && e.schema.classes.fieldContainer || "")
  }, [
    B("label", {
      for: e.id,
      class: I(e.schema.classes && e.schema.classes.label || "")
    }, C(e.schema.label || ""), 11, T),
    B("textarea", {
      id: e.id,
      value: e.model[e.schema.model],
      onBlur: l[0] || (l[0] = (...d) => e.handleBlur && e.handleBlur(...d)),
      onChange: l[1] || (l[1] = (...d) => e.handleChange && e.handleChange(...d)),
      onInput: l[2] || (l[2] = j((...d) => e.handleInput && e.handleInput(...d), ["stop"])),
      class: I(e.schema.classes && e.schema.classes.field || "")
    }, null, 42, R)
  ], 2);
}
const J = /* @__PURE__ */ M(D, [["render", H]]), Q = b({
  name: "FormGroup",
  components: {},
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    },
    id: {}
  },
  computed: {},
  methods: {
    localFieldModel(e) {
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model][e] || {};
    },
    localModel() {
      return this.model.hasOwnProperty(this.schema.model) && this.model[this.schema.model].length !== 0 ? this.model[this.schema.model] : [{}];
    },
    handleBlur(e) {
      this.$emit("blur", { ...e, groupModel: this.schema.model });
    },
    handleChange(e) {
      this.$emit("change-model", { ...e, groupModel: this.schema.model });
    },
    handleInput(e) {
      this.$emit("input", { ...e, groupModel: this.schema.model });
    }
  }
});
const U = { class: "form-group" }, W = ["id"];
function X(e, l, a, s, u, c) {
  return h(), p("div", U, [
    w(C(e.schema.label || "") + " ", 1),
    (h(!0), p(E, null, q(e.localModel(), (d, i) => (h(), p(E, null, [
      (h(!0), p(E, null, q(e.schema.items, (m) => (h(), p("div", {
        key: `group-${i}`,
        id: `${i}-${m.model}`
      }, [
        k(e.$slots, "field", {
          id: `${e.id}-${m.model}-${i}`,
          model: e.localFieldModel(i),
          schema: m,
          index: i,
          onBlur: l[0] || (l[0] = (...f) => e.handleBlur && e.handleBlur(...f)),
          onChangeModel: l[1] || (l[1] = (...f) => e.handleChange && e.handleChange(...f)),
          onInput: l[2] || (l[2] = (...f) => e.handleInput && e.handleInput(...f))
        }, void 0, !0)
      ], 8, W))), 128)),
      k(e.$slots, "button", { index: i }, void 0, !0)
    ], 64))), 256))
  ]);
}
const Y = /* @__PURE__ */ M(Q, [["render", X], ["__scopeId", "data-v-589a6f6e"]]), Z = b({
  name: "FormSelect",
  props: {
    model: {
      type: Object,
      default: () => ({}),
      required: !0
    },
    schema: {
      type: Object,
      default: () => ({}),
      required: !0
    },
    id: {
      type: String,
      required: !0
    }
  },
  computed: {
    value: {
      get() {
        return this.schema.multiple ? this.schema.multipleAsObjects ? (this.model[this.schema.model] || []).map(
          (e) => e[this.schema.optionValueKey || "value"]
        ) : this.model[this.schema.model] || [] : this.model[this.schema.model] || "";
      },
      set(e, ...l) {
        return e;
      }
    }
  },
  setup(e, l) {
    const { model: a, schema: s, id: u } = V(e), c = (o) => {
      if (s.value.multipleAsObjects) {
        let t = {};
        return t[s.value.optionValueKey || "value"] = o.value, t[s.value.optionLabelKey || "label"] = o.label, t;
      }
      return o.value;
    }, d = (o) => Array(...o).reduce((t, v) => (t.push(c(v)), t), []), i = (o) => s.value.multiple ? d(o) : o, m = (o, t, v = null) => {
      l.emit(o, {
        value: i(t),
        model: a,
        schema: s,
        id: u,
        originalEvent: v
      });
    };
    return { handleBlur: (o) => {
      m(
        "blured",
        s.value.multiple ? o.target.selectedOptions : o.target.value,
        o
      );
    }, handleChange: (o) => {
      console.log("eeee", o.target.selectedOptions), m(
        "change-model",
        s.value.multiple ? o.target.selectedOptions : o.target.value,
        o
      );
    }, emitEvent: m };
  }
}), _ = ["for"], x = ["id", "value", "name", "size", "multiple", "disabled", "required"], ee = {
  key: 0,
  value: ""
}, le = ["value", "selected"];
function ne(e, l, a, s, u, c) {
  return h(), p("label", { for: e.id }, [
    w(C(e.schema.label || "") + " ", 1),
    B("select", {
      id: e.id,
      value: e.value,
      name: e.schema.name,
      size: e.schema.size,
      multiple: e.schema.multiple,
      disabled: e.schema.disabled,
      required: e.schema.required,
      onBlur: l[0] || (l[0] = (...d) => e.handleBlur && e.handleBlur(...d)),
      onChange: l[1] || (l[1] = j((...d) => e.handleChange && e.handleChange(...d), ["stop"]))
    }, [
      e.schema.multiple ? O("", !0) : (h(), p("option", ee, C(e.schema.nothingSelectedLabel || "Nothing selected"), 1)),
      (h(!0), p(E, null, q(e.schema.options, (d) => (h(), p("option", {
        key: `${e.id}-${e.schema.model}-${d[e.schema.optionValueKey || "value"]}-temp`,
        value: d[e.schema.optionValueKey || "value"],
        selected: e.schema.multiple ? e.value.includes(String(d[e.schema.optionValueKey || "value"])) : e.value === d[e.schema.optionValueKey || "value"]
      }, C(d[e.schema.optionLabelKey || "label"]), 9, le))), 128))
    ], 40, x)
  ], 8, _);
}
const oe = /* @__PURE__ */ M(Z, [["render", ne]]), ae = b({
  name: "FormField",
  components: {
    FormSelect: oe,
    FormGroup: Y,
    FormTextarea: J,
    FormInput: L
  },
  props: {
    model: { required: !0, type: Object },
    schema: { required: !0, type: Object },
    id: {
      type: String,
      required: !0
    }
  },
  mounted() {
  },
  methods: {
    handleInputBlur(e) {
      this.$emit("blured", e);
    },
    handleChange(e) {
      this.$emit("change-model", e);
    },
    handleInput(e) {
      this.$emit("form-input", e);
    },
    handleInputGroupBlur(e, l, a) {
      e.schemaModelPath = [l.model, ...e.schemaModelPath || []], e.schemaModelIndex = [a.index, ...e.schemaModelIndex || []], this.$emit("blured", e, l, a);
    },
    handleGroupChange(e, l, a) {
      e.schemaModelPath = [l.model, ...e.schemaModelPath || []], e.schemaModelIndex = [a.index, ...e.schemaModelIndex || []], this.$emit("change-model", e, l, a);
    },
    handleGroupInput(e, l, a) {
      e.schemaModelPath = [l.model, ...e.schemaModelPath || []], e.schemaModelIndex = [a.index, ...e.schemaModelIndex || []], this.$emit("form-input", e, l, a);
    },
    addGroupElement(e, l, a) {
      let s = {};
      s.schemaModelPath = [l.model, ...s.schemaModelPath || []], s.schemaModelIndex = [a.index, ...s.schemaModelIndex || []], this.$emit("add-group-element", { customEvent: s, groupSchema: l, slotProps: a });
    }
  }
}), se = { class: "form-field" }, de = ["onClick"];
function me(e, l, a, s, u, c) {
  const d = y("form-input"), i = y("form-textarea"), m = y("form-select"), f = y("form-field", !0), n = y("form-group");
  return h(), p("div", se, [
    e.schema.type === "input" ? (h(), G(d, {
      key: 0,
      id: `${e.id}-${e.schema.model}`,
      model: e.model,
      schema: e.schema,
      onBlured: e.handleInputBlur,
      onChangeModel: e.handleChange,
      onFormInput: e.handleInput
    }, null, 8, ["id", "model", "schema", "onBlured", "onChangeModel", "onFormInput"])) : O("", !0),
    e.schema.type === "textarea" ? (h(), G(i, {
      key: 1,
      id: `${e.id}-${e.schema.model}`,
      model: e.model,
      schema: e.schema,
      onBlured: e.handleInputBlur,
      onChangeModel: e.handleChange,
      onFormInput: e.handleInput
    }, null, 8, ["id", "model", "schema", "onBlured", "onChangeModel", "onFormInput"])) : O("", !0),
    e.schema.type === "select" ? (h(), G(m, {
      key: 2,
      id: `${e.id}-${e.schema.model}`,
      model: e.model,
      schema: e.schema,
      onBlured: e.handleInputBlur,
      onChangeModel: e.handleChange
    }, null, 8, ["id", "model", "schema", "onBlured", "onChangeModel"])) : O("", !0),
    e.schema.type === "group" ? (h(), G(n, {
      key: 3,
      model: e.model,
      schema: e.schema,
      id: `${e.id}-${e.schema.model}`,
      onBlured: e.handleInputBlur,
      onChangeModel: e.handleChange,
      onFormInput: e.handleInput
    }, {
      field: A((o) => [
        P(f, {
          id: o.id,
          model: o.model,
          schema: o.schema,
          onBlured: (t) => e.handleInputGroupBlur(t, e.schema, o),
          onChangeModel: (t) => e.handleGroupChange(t, e.schema, o),
          onFormInput: (t) => e.handleGroupInput(t, e.schema, o),
          onAddGroupElement: (t) => e.addGroupElement(t, e.schema, o)
        }, null, 8, ["id", "model", "schema", "onBlured", "onChangeModel", "onFormInput", "onAddGroupElement"])
      ]),
      button: A((o) => [
        B("button", {
          onClick: (t) => e.addGroupElement(t, e.schema, o)
        }, "add", 8, de)
      ]),
      _: 1
    }, 8, ["model", "schema", "id", "onBlured", "onChangeModel", "onFormInput"])) : O("", !0)
  ]);
}
const te = /* @__PURE__ */ M(ae, [["render", me]]), re = b({
  name: "FormVuelator",
  components: {
    FormField: te
  },
  props: {
    model: { required: !0, type: Object },
    schema: { type: Array, required: !0 },
    id: {}
  },
  emits: ["change-model", "model-created-property", "model-created-index"],
  setup: (e, l) => {
    const { model: a, schema: s, id: u } = V(e), c = (n, o, t, v, F) => {
      let r, g;
      [r, ...o] = o, [g, ...t] = t;
      let $ = {};
      if (r && o.length === 0 && ($[v] = F.value), console.log("trpp", $, n, o, t, v, F), n.hasOwnProperty(r) ? n[r][g] ? n[r][g] = { ...n[r][g], ...$ } : (Array.isArray(n[r]) ? n[r].push($) : (n[r] = [], n[r] = n[r].push($)), l.emit("model-created-index", { currentModel: n, pathElement: r, indexElement: g, schema: F.schema.value }), console.log("trollo1")) : (n[r] = [], n[r].hasOwnProperty(g) ? (n[r] = [], n[r] = n[r].push($), l.emit("model-created-property", { currentModel: n, pathElement: r, indexElement: g, schema: F.schema.value }), console.log("trollo2")) : n[r][g] = $), o.length === 0) {
        n[r][g] = { ...n[r][g], ...$ };
        return;
      }
      c(n[r][g], o, t, v, F);
    };
    return { model: a, schema: s, handleBlur: (n) => {
      console.log("blur", n);
    }, handleChange: (n) => {
      console.log("change", n);
      let o = a.value, t = n.schema.value.model;
      if (n.hasOwnProperty("schemaModelPath") && n.hasOwnProperty("schemaModelIndex")) {
        c(a.value, n.schemaModelPath, n.schemaModelIndex, t, n);
        return;
      }
      o[t] = n.value, l.emit("change-model", o, n.schema.value);
    }, handleInput: (n) => {
      console.log(n);
      let o = a.value, t = n.schema.value.model;
      if (n.hasOwnProperty("schemaModelPath") && n.hasOwnProperty("schemaModelIndex")) {
        c(a.value, n.schemaModelPath, n.schemaModelIndex, t, n);
        return;
      }
      console.log(n.value), o[t] = n.value, l.emit("change-model", o, n.schema.value);
    }, handleAddGroup: (n) => {
      console.log("add", n), n.customEvent.schemaModelPath, n.customEvent.schemaModelIndex;
    }, id: u };
  }
});
function ue(e, l, a, s, u, c) {
  const d = y("form-field");
  return h(!0), p(E, null, q(e.schema, (i, m) => (h(), p("div", {
    key: `root-field-${m}`
  }, [
    P(d, {
      model: e.model,
      schema: i,
      id: i.model,
      onBlured: e.handleBlur,
      onChangeModel: e.handleChange,
      onFormInput: e.handleInput,
      onAddGroupElement: e.handleAddGroup
    }, null, 8, ["model", "schema", "id", "onBlured", "onChangeModel", "onFormInput", "onAddGroupElement"])
  ]))), 128);
}
const ie = /* @__PURE__ */ M(re, [["render", ue]]);
export {
  ie as FormVuelator
};
