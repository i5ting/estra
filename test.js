

class Servlet {
    params(){
        console.log('b1')
    }
}

class A extends Servlet{
    get(path = "/") {
        console.log('get')
        this.params()
        return '{"message":"hello world"}'
    }    
}

var a = new A()

a.get()