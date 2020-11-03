(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{785:function(e,o,t){"use strict";t.r(o);var r=t(1),a=Object(r.a)({},(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"adr-026-general-merkle-proof"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adr-026-general-merkle-proof"}},[e._v("#")]),e._v(" ADR 026: General Merkle Proof")]),e._v(" "),t("h2",{attrs:{id:"context"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),t("p",[e._v("We are using raw "),t("code",[e._v("[]byte")]),e._v(" for merkle proofs in "),t("code",[e._v("abci.ResponseQuery")]),e._v(". It makes hard to handle multilayer merkle proofs and general cases. Here, new interface "),t("code",[e._v("ProofOperator")]),e._v(" is defined. The users can defines their own Merkle proof format and layer them easily.")]),e._v(" "),t("p",[e._v("Goals:")]),e._v(" "),t("ul",[t("li",[e._v("Layer Merkle proofs without decoding/reencoding")]),e._v(" "),t("li",[e._v("Provide general way to chain proofs")]),e._v(" "),t("li",[e._v("Make the proof format extensible, allowing thirdparty proof types")])]),e._v(" "),t("h2",{attrs:{id:"decision"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),t("h3",{attrs:{id:"proofoperator"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#proofoperator"}},[e._v("#")]),e._v(" ProofOperator")]),e._v(" "),t("p",[t("code",[e._v("type ProofOperator")]),e._v(" is an interface for Merkle proofs. The definition is:")]),e._v(" "),t("code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBQcm9vZk9wZXJhdG9yIGludGVyZmFjZSB7CiAgICBSdW4oW11bXWJ5dGUpIChbXVtdYnl0ZSwgZXJyb3IpCiAgICBHZXRLZXkoKSBbXWJ5dGUKICAgIFByb29mT3AoKSBQcm9vZk9wCn0K"}}),e._v(" "),t("p",[e._v("Since a proof can treat various data type, "),t("code",[e._v("Run()")]),e._v(" takes "),t("code",[e._v("[][]byte")]),e._v(" as the argument, not "),t("code",[e._v("[]byte")]),e._v(". For example, a range proof's "),t("code",[e._v("Run()")]),e._v(" can take multiple key-values as its argument. It will then return the root of the tree for the further process, calculated with the input value.")]),e._v(" "),t("p",[t("code",[e._v("ProofOperator")]),e._v(" does not have to be a Merkle proof - it can be a function that transforms the argument for intermediate process e.g. prepending the length to the "),t("code",[e._v("[]byte")]),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"proofop"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#proofop"}},[e._v("#")]),e._v(" ProofOp")]),e._v(" "),t("p",[t("code",[e._v("type ProofOp")]),e._v(" is a protobuf message which is a triple of "),t("code",[e._v("Type string")]),e._v(", "),t("code",[e._v("Key []byte")]),e._v(", and "),t("code",[e._v("Data []byte")]),e._v(". "),t("code",[e._v("ProofOperator")]),e._v(" and "),t("code",[e._v("ProofOp")]),e._v("are interconvertible, using "),t("code",[e._v("ProofOperator.ProofOp()")]),e._v(" and "),t("code",[e._v("OpDecoder()")]),e._v(", where "),t("code",[e._v("OpDecoder")]),e._v(" is a function that each proof type can register for their own encoding scheme. For example, we can add an byte for encoding scheme before the serialized proof, supporting JSON decoding.")]),e._v(" "),t("h2",{attrs:{id:"status"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),t("h2",{attrs:{id:"consequences"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),t("h3",{attrs:{id:"positive"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),t("ul",[t("li",[e._v("Layering becomes easier (no encoding/decoding at each step)")]),e._v(" "),t("li",[e._v("Thirdparty proof format is available")])]),e._v(" "),t("h3",{attrs:{id:"negative"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),t("ul",[t("li",[e._v("Larger size for abci.ResponseQuery")]),e._v(" "),t("li",[e._v("Unintuitive proof chaining(it is not clear what "),t("code",[e._v("Run()")]),e._v(" is doing)")]),e._v(" "),t("li",[e._v("Additional codes for registering "),t("code",[e._v("OpDecoder")]),e._v("s")])])],1)}),[],!1,null,null,null);o.default=a.exports}}]);