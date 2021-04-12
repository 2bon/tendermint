(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{525:function(e,t,a){e.exports=a.p+"assets/img/light-client-detector.fe1a3d76.png"},526:function(e,t,a){e.exports=a.p+"assets/img/bifurcation-point.ebc4ac9f.png"},633:function(e,t,a){"use strict";a.r(t);var i=a(1),n=Object(i.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h1",{attrs:{id:"adr-047-handling-evidence-from-light-client"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#adr-047-handling-evidence-from-light-client"}},[e._v("#")]),e._v(" ADR 047: Handling evidence from light client")]),e._v(" "),i("h2",{attrs:{id:"changelog"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),i("ul",[i("li",[e._v("18-02-2020: Initial draft")]),e._v(" "),i("li",[e._v("24-02-2020: Second version")]),e._v(" "),i("li",[e._v("13-04-2020: Add PotentialAmnesiaEvidence and a few remarks")]),e._v(" "),i("li",[e._v("31-07-2020: Remove PhantomValidatorEvidence")]),e._v(" "),i("li",[e._v("14-08-2020: Introduce light traces (listed now as an alternative approach)")]),e._v(" "),i("li",[e._v("20-08-2020: Light client produces evidence when detected instead of passing to full node")]),e._v(" "),i("li",[e._v("16-09-2020: Post-implementation revision")]),e._v(" "),i("li",[e._v("15-03-2020: Ammends for the case of a forward lunatic attack")])]),e._v(" "),i("h3",{attrs:{id:"glossary-of-terms"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#glossary-of-terms"}},[e._v("#")]),e._v(" Glossary of Terms")]),e._v(" "),i("ul",[i("li",[e._v("a "),i("code",[e._v("LightBlock")]),e._v(" is the unit of data that a light client receives, verifies and stores.\nIt is composed of a validator set, commit and header all at the same height.")]),e._v(" "),i("li",[e._v("a "),i("strong",[e._v("Trace")]),e._v(" is seen as an array of light blocks across a range of heights that were\ncreated as a result of skipping verification.")]),e._v(" "),i("li",[e._v("a "),i("strong",[e._v("Provider")]),e._v(" is a full node that a light client is connected to and serves the light\nclient signed headers and validator sets.")]),e._v(" "),i("li",[i("code",[e._v("VerifySkipping")]),e._v(" (sometimes known as bisection or verify non-adjacent) is a method the\nlight client uses to verify a target header from a trusted header. The process involves verifying\nintermediate headers in between the two by making sure that 1/3 of the validators that signed\nthe trusted header also signed the untrusted one.")]),e._v(" "),i("li",[i("strong",[e._v("Light Bifurcation Point")]),e._v(": If the light client was to run "),i("code",[e._v("VerifySkipping")]),e._v(" with two providers\n(i.e. a primary and a witness), the bifurcation point is the height that the headers\nfrom each of these providers are different yet valid. This signals that one of the providers\nmay be trying to fool the light client.")])]),e._v(" "),i("h2",{attrs:{id:"context"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),i("p",[e._v("The bisection method of header verification used by the light client exposes\nitself to a potential attack if any block within the light clients trusted period has\na malicious group of validators with power that exceeds the light clients trust level\n(default is 1/3). To improve light client (and overall network) security, the light\nclient has a detector component that compares the verified header provided by the\nprimary against witness headers. This ADR outlines the process of mitigating attacks\non the light client by using witness nodes to cross reference with.")]),e._v(" "),i("h2",{attrs:{id:"alternative-approaches"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#alternative-approaches"}},[e._v("#")]),e._v(" Alternative Approaches")]),e._v(" "),i("p",[e._v("A previously discussed approach to handling evidence was to pass all the data that the\nlight client had witnessed when it had observed diverging headers for the full node to\nprocess.This was known as a light trace and had the following structure:")]),e._v(" "),i("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBDb25mbGljdGluZ0hlYWRlcnNUcmFjZSBzdHJ1Y3QgewogIEhlYWRlcnMgW10qdHlwZXMuU2lnbmVkSGVhZGVyCn0K"}}),e._v(" "),i("p",[e._v("This approach has the advantage of not requiring as much processing on the light\nclient side in the event that an attack happens. Although, this is not a significant\ndifference as the light client would in any case have to validate all the headers\nfrom both witness and primary. Using traces would consume a large amount of bandwidth\nand adds a DDOS vector to the full node.")]),e._v(" "),i("h2",{attrs:{id:"decision"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),i("p",[e._v("The light client will be divided into two components: a "),i("code",[e._v("Verifier")]),e._v(" (either sequential or\nskipping) and a "),i("code",[e._v("Detector")]),e._v(" (see "),i("a",{attrs:{href:"https://github.com/informalsystems/tendermint-rs/blob/master/docs/spec/lightclient/detection/detection.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Informal's Detector"),i("OutboundLink")],1),e._v(")\n. The detector will take the trace of headers from the primary and check it against all\nwitnesses. For a witness with a diverging header, the detector will first verify the header\nby bisecting through all the heights defined by the trace that the primary provided. If valid,\nthe light client will trawl through both traces and find the point of bifurcation where it\ncan proceed to extract any evidence (as is discussed in detail later).")]),e._v(" "),i("p",[e._v("Upon successfully detecting the evidence, the light client will send it to both primary and\nwitness before halting. It will not send evidence to other peers nor continue to verify the\nprimary's header against any other header.")]),e._v(" "),i("h2",{attrs:{id:"detailed-design"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#detailed-design"}},[e._v("#")]),e._v(" Detailed Design")]),e._v(" "),i("p",[e._v("The verification process of the light client will start from a trusted header and use a bisectional\nalgorithm to verify up to a header at a given height. This becomes the verified header (does not\nmean that it is trusted yet). All headers that were verified in between are cached and known as\nintermediary headers and the entire array is sometimes referred to as a trace.")]),e._v(" "),i("p",[e._v("The light client's detector then takes all the headers and runs the detect function.")]),e._v(" "),i("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"ZnVuYyAoYyAqQ2xpZW50KSBkZXRlY3REaXZlcmdlbmNlKHByaW1hcnlUcmFjZSBbXSp0eXBlcy5MaWdodEJsb2NrLCBub3cgdGltZS5UaW1lKSBlcnJvcgo="}}),e._v(" "),i("p",[e._v("The function takes the last header it received, the target header and compares it against all the witnesses\nit has through the following function:")]),e._v(" "),i("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"ZnVuYyAoYyAqQ2xpZW50KSBjb21wYXJlTmV3SGVhZGVyV2l0aFdpdG5lc3MoZXJyYyBjaGFuIGVycm9yLCBoICp0eXBlcy5TaWduZWRIZWFkZXIsCgl3aXRuZXNzIHByb3ZpZGVyLlByb3ZpZGVyLCB3aXRuZXNzSW5kZXggaW50KQo="}}),e._v(" "),i("p",[e._v("The err channel is used to send back all the outcomes so that they can be processed in parallel.\nInvalid headers result in dropping the witness, lack of response or not having the headers is ignored\njust as headers that have the same hash. Headers, however,\nof a different hash then trigger the detection process between the primary and that particular witness.")]),e._v(" "),i("p",[e._v("This begins with verification of the witness's header via skipping verification which is run in tande\nwith locating the Light Bifurcation Point")]),e._v(" "),i("p",[i("img",{attrs:{src:a(525),alt:""}})]),e._v(" "),i("p",[e._v("This is done with:")]),e._v(" "),i("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"ZnVuYyAoYyAqQ2xpZW50KSBleGFtaW5lQ29uZmxpY3RpbmdIZWFkZXJBZ2FpbnN0VHJhY2UoCgl0cmFjZSBbXSp0eXBlcy5MaWdodEJsb2NrLAoJdGFyZ2V0QmxvY2sgKnR5cGVzLkxpZ2h0QmxvY2ssCglzb3VyY2UgcHJvdmlkZXIuUHJvdmlkZXIsIAoJbm93IHRpbWUuVGltZSwKCSkgKFtdKnR5cGVzLkxpZ2h0QmxvY2ssICp0eXBlcy5MaWdodEJsb2NrLCBlcnJvcikK"}}),e._v(" "),i("p",[e._v("which performs the following")]),e._v(" "),i("ol",[i("li",[i("p",[e._v("Checking that the trusted header is the same. Currently, they should not theoretically be different\nbecause witnesses cannot be added and removed after the client is initialized. But we do this any way\nas a sanity check. If this fails we have to drop the witness.")])]),e._v(" "),i("li",[i("p",[e._v("Querying and verifying the witness's headers using bisection at the same heights of all the\nintermediary headers of the primary (In the above example this is A, B, C, D, F, H). If bisection fails\nor the witness stops responding then we can call the witness faulty and drop it.")])]),e._v(" "),i("li",[i("p",[e._v("We eventually reach a verified header by the witness which is not the same as the intermediary header\n(In the above example this is E). This is the point of bifurcation (This could also be the last header).")])]),e._v(" "),i("li",[i("p",[e._v("There is a unique case where the trace that is being examined against has blocks that have a greater\nheight than the targetBlock. This can occur as part of a forward lunatic attack where the primary has\nprovided a light block that has a height greater than the head of the chain (see Appendix B). In this\ncase, the light client will verify the sources blocks up to the targetBlock and return the block in the\ntrace that is directly after the targetBlock in height as the "),i("code",[e._v("ConflictingBlock")])])])]),e._v(" "),i("p",[e._v("This function then returns the trace of blocks from the witness node between the common header and the\ndivergent header of the primary as it is likely, as seen in the example to the right, that multiple\nheaders where required in order to verify the divergent one. This trace will\nbe used later (as is also described later in this document).")]),e._v(" "),i("p",[i("img",{attrs:{src:a(526),alt:""}})]),e._v(" "),i("p",[e._v("Now, that an attack has been detected, the light client must form evidence to prove it. There are\nthree types of attacks that either the primary or witness could have done to try fool the light client\ninto verifying the wrong header: Lunatic, Equivocation and Amnesia. As the consequence is the same and\nthe data required to prove it is also very similar, we bundle these attack styles together in a single\nevidence:")]),e._v(" "),i("tm-code-block",{staticClass:"codeblock",attrs:{language:"golang",base64:"dHlwZSBMaWdodENsaWVudEF0dGFja0V2aWRlbmNlIHN0cnVjdCB7CglDb25mbGljdGluZ0Jsb2NrICpMaWdodEJsb2NrCglDb21tb25IZWlnaHQgICAgIGludDY0Cn0K"}}),e._v(" "),i("p",[e._v("The light client takes the stance of first suspecting the primary. Given the bifurcation point found\nabove, it takes the two divergent headers and compares whether the one from the primary is valid with\nrespect to the one from the witness. This is done by calling "),i("code",[e._v("isInvalidHeader()")]),e._v(" which looks to see if\nany one of the deterministically derived header fields differ from one another. This could be one of\n"),i("code",[e._v("ValidatorsHash")]),e._v(", "),i("code",[e._v("NextValidatorsHash")]),e._v(", "),i("code",[e._v("ConsensusHash")]),e._v(", "),i("code",[e._v("AppHash")]),e._v(", and "),i("code",[e._v("LastResultsHash")]),e._v(".\nIn this case we know it's a Lunatic attack and to help the witness verify it we send the height\nof the common header which is 1 in the example above or C in the example above that. If all these\nhashes are the same then we can infer that it is either Equivocation or Amnesia. In this case we send\nthe height of the diverged headers because we know that the validator sets are the same, hence the\nmalicious nodes are still bonded at that height. In the example above, this is height 10 and the\nexample above that it is the height at E.")]),e._v(" "),i("p",[e._v("The light client now has the evidence and broadcasts it to the witness.")]),e._v(" "),i("p",[e._v("However, it could have been that the header the light client used from the witness against the primary\nwas forged, so before halting the light client swaps the process and thus suspects the witness and\nuses the primary to create evidence. It calls "),i("code",[e._v("examineConflictingHeaderAgainstTrace")]),e._v(" this time using\nthe witness trace found earlier.\nIf the primary was malicious it is likely that it will not respond but if it is innocent then the\nlight client will produce the same evidence but this time the conflicting\nblock will come from the witness node instead of the primary. The evidence is then formed and sent to\nthe primary node.")]),e._v(" "),i("p",[e._v("This then ends the process and the verify function that was called at the start returns the error to\nthe user.")]),e._v(" "),i("p",[e._v("For a detailed overview of how each of these three attacks can be conducted please refer to the\n"),i("a",{attrs:{href:"(https://github.com/tendermint/spec/blob/master/spec/consensus/light-client/accountability.md)"}},[e._v("fork accountability spec")]),e._v(".")]),e._v(" "),i("h2",{attrs:{id:"full-node-verification"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#full-node-verification"}},[e._v("#")]),e._v(" Full Node Verification")]),e._v(" "),i("p",[e._v("When a full node receives evidence from the light client it will need to verify\nit for itself before gossiping it to peers and trying to commit it on chain. This process is outlined\nin "),i("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-059-evidence-composition-and-lifecycle.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ADR-059"),i("OutboundLink")],1),e._v(".")]),e._v(" "),i("h2",{attrs:{id:"status"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),i("p",[e._v("Implemented.")]),e._v(" "),i("h2",{attrs:{id:"consequences"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),i("h3",{attrs:{id:"positive"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),i("ul",[i("li",[e._v("Light client has increased security against Lunatic, Equivocation and Amnesia attacks.")]),e._v(" "),i("li",[e._v("Do not need intermediate data structures to encapsulate the malicious behavior")]),e._v(" "),i("li",[e._v("Generalized evidence makes the code simpler")])]),e._v(" "),i("h3",{attrs:{id:"negative"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),i("ul",[i("li",[e._v("Breaking change on the light client from versions 0.33.8 and below. Previous\nversions will still send "),i("code",[e._v("ConflictingHeadersEvidence")]),e._v(" but it won't be recognized\nby the full node. Light clients will however still refuse the header and shut down.")]),e._v(" "),i("li",[e._v("Amnesia attacks although detected, will not be able to be punished as it is not\nclear from the current information which nodes behaved maliciously.")]),e._v(" "),i("li",[e._v("Evidence module must handle both individual and grouped evidence.")])]),e._v(" "),i("h3",{attrs:{id:"neutral"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),i("h2",{attrs:{id:"references"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),i("ul",[i("li",[i("a",{attrs:{href:"https://github.com/tendermint/spec/blob/master/spec/consensus/light-client/accountability.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fork accountability spec"),i("OutboundLink")],1)]),e._v(" "),i("li",[i("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-056-light-client-amnesia-attacks.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ADR 056: Light client amnesia attacks"),i("OutboundLink")],1)]),e._v(" "),i("li",[i("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-059-evidence-composition-and-lifecycle.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ADR-059: Evidence Composition and Lifecycle"),i("OutboundLink")],1)]),e._v(" "),i("li",[i("a",{attrs:{href:"https://github.com/informalsystems/tendermint-rs/blob/master/docs/spec/lightclient/detection/detection.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Informal's Light Client Detector"),i("OutboundLink")],1)])]),e._v(" "),i("h2",{attrs:{id:"appendix-a"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#appendix-a"}},[e._v("#")]),e._v(" Appendix A")]),e._v(" "),i("p",[e._v("PhantomValidatorEvidence was used to capture when a validator that was still staked\n(i.e. within the bonded period) but was not in the current validator set had voted for a block.")]),e._v(" "),i("p",[e._v("In later discussions it was argued that although possible to keep phantom validator\nevidence, any case a phantom validator that could have the capacity to be involved\nin fooling a light client would have to be aided by 1/3+ lunatic validators.")]),e._v(" "),i("p",[e._v("It would also be very unlikely that the new validators injected by the lunatic attack\nwould be validators that currently still have something staked.")]),e._v(" "),i("p",[e._v("Not only this but there was a large degree of extra computation required in storing all\nthe currently staked validators that could possibly fall into the group of being\na phantom validator. Given this, it was removed.")]),e._v(" "),i("h2",{attrs:{id:"appendix-b"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#appendix-b"}},[e._v("#")]),e._v(" Appendix B")]),e._v(" "),i("p",[e._v("A unique flavor of lunatic attack is a forward lunatic attack. This is where a malicious\nnode provides a header with a height greater than the height of the blockchain. Thus there\nare no witnesses capable of rebutting the malicious header. Such an attack will also\nrequire an accomplice, i.e. at least one other witness to also return the same forged header.\nAlthough such attacks can be any arbitrary height ahead, they must still remain within the\nclock drift of the light clients real time. Therefore, to detect such an attack, a light\nclient will wait for a time")]),e._v(" "),i("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"MiAqIE1BWF9DTE9DS19EUklGVCArIExBRwo="}}),e._v(" "),i("p",[e._v("for a witness to provide the latest block it has. Given the time constraints, if the witness\nis operating at the head of the blockchain, it will have a header with an earlier height but\na later timestamp. This can be used to prove that the primary has submitted a lunatic header\nwhich violates monotonically increasing time.")])],1)}),[],!1,null,null,null);t.default=n.exports}}]);