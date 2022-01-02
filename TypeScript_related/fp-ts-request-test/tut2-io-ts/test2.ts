import * as t from "io-ts";

type HttpOK = 200;
type SuccessCodecs = 200 | 201 | 202;

const httpOKCodec = t.literal(200);
const SuccessCodecsCodec = t.union([
    t.literal(200),
    t.literal(201),
    t.literal(202),
])
