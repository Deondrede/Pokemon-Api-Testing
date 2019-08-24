function testReplace (data) {
    data = data.replace(/\n/g," ");
    return data;
}

var test = testReplace("When several of these POKéMON gather,\ntheir electricity can build and cause\nlightning storms.");
console.log(test);
console.log("When several of these POKéMON gather,\ntheir electricity can build and cause\nlightning storms.")