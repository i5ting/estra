module.exports = class A {
    "/2" (method = "get") {
        return '{"message":"hello 2"}'
    }

    "/3" (method = "get") {
        return '{"message":"hello 3"}'
    }

    "/hi" (method = "get") {
        return '{"message":"hello hi"}'
    }
}