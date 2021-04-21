const http = require('http')
const requireDir = require('require-dir')
const flatten = require('flat')

const debug = require('debug')('estra')

const FN_ARGS = /^(function)?\s*\*?\s*[^\(]*\(\s*([^\)]*)\)/m
const FN_ARG_SPLIT = /,/
const FN_ARG = /^\s*(_?)(\S+?)\1\s*$/
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg

const cache = {}

function getParameters(fn) {
    const fnText = fn.toString();
    if (!cache[fnText]) {
        const inject = {};
        const argDecl = fnText.replace(STRIP_COMMENTS, '').match(FN_ARGS);
        // console.log(argDecl)

        argDecl[2].split(FN_ARG_SPLIT).forEach(function (arg) {
            // console.log(arg)
            if (arg.indexOf('=') != -1) {
                var i = arg.split("=")
                inject[i[0].trim()] = i[1].split('"')[1]
            }
            arg.replace(FN_ARG, function (all, underscore, name) {
                inject[name] = null
            });
        });

        cache[fnText] = inject
    }

    return cache[fnText]
}

function mountOne(router, Clazz) {
    console.dir(Clazz)
    var a = new Clazz()

    var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(a));
    

    for (var i in propertyNames) {
        // console.dir(propertyNames[i])
        if ('constructor' !== propertyNames[i]) {
            var parameters = getParameters(a[propertyNames[i]])
            var method = parameters['method'] || 'GET'
            // console.dir(b)

            const _original = a[propertyNames[i]];
            
            const _newfn = function () {
                // console.log('in');
                // console.dir(arguments[0])
                debug(_original + "")
                var result = _original.apply(this, arguments);
                // console.log('out');
                return result;
            }
        
            router.on(method.toUpperCase() , propertyNames[i], (req, res, params) => {
                // res.end('{"message":"hello world"}')
                a.req = req
                a.res = res

                var html = _newfn.bind(a)(propertyNames[i], req, res, params);
                res.end(html)
            })
        }
    }
}

module.exports = function (dir) {
    const router = require('find-my-way')()
    const all = requireDir(dir, { recurse: true })
    console.dir((dir))
    console.dir((all))
    const objects = flatten(all)

    console.dir((objects))

    for (var i in objects) {
        console.dir(i)
        const Clazz = objects[i]
        mountOne(router, Clazz)
    }

    console.log(router.prettyPrint())

    const server = http.createServer((req, res) => {
        router.lookup(req, res)
    })

    return server
}
