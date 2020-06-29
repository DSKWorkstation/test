 var myExtObject = (function () {

    return {
        func1: function () {


            //     var AutoEstimate = Parse.Object.extend("AutoEstimate");
            //     var query = new Parse.Query(AutoEstimate);
            //     //limit= 5;
            //     query.limit(5);
            //    // query.equalTo("playerName", "Dan Stemkoski");
            //     query.find().then((gameScores) => {
            //         resolve(gameScores);
            //       }, (error) => {
            //         reject(error);
            //       });
        }
        ,
        func2: function () {
            alert('function 2 called');
        }
    }

})(myExtObject || {})


var webGlObject = (function () {
    return {
        init: function () {
            alert('webGlObject initialized');
        }
    }
})(webGlObject || {})