var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
 
exports.handler = (event, context, callback) => {
  var CallerID = event.Details.Parameters.CallerID;
  var paramsQuery = {
    TableName: 'callerLookup',
    KeyConditionExpression: "CallerID = :varNumber",
    ExpressionAttributeValues: { ":varNumber": CallerID }
  };
 
  docClient.query(paramsQuery, function(err, data) {
    if (err) {
      console.log(err);
      callback(null, buildResponse(false));
    }
    else {
      console.log("DynamoDB Query Results:" + JSON.stringify(data));
 
      if (data.Items.length === 0) {
        console.log("Customer not Found in callerLookup");
        var recordFound = "False";
        callback(null, buildResponse(true, recordFound));
      }
      else {
        var recordFound = "True"
        var lastName = data.Items[0].lastName;
        var firstName = data.Items[0].firstName;
        var accountNum = data.Items[0].accountNum;
        var addressCity = data.Items[0].addressCity;
        var addressStreet = data.Items[0].addressStreet;
        var addressZip = data.Items[0].addressZip;
        var streetNum = data.Items[0].streetNum;
        var phoneNum = data.Items[0].phoneNum;
        callback(null, buildResponse(true, recordFound, lastName, firstName, accountNum, addressCity, addressStreet, addressZip, streetNum, phoneNum));
      }
    }
  });
};
 
function buildResponse(isSuccess, recordFound, lastName, firstName, accountNum, addressCity, addressStreet, addressZip, streetNum, phoneNum) {
  if (isSuccess) {
    return {
      recordFound: recordFound,
      lastName: lastName,
      firstName: firstName,
      accountNum: accountNum,
      addressCity: addressCity,
      addressStreet: addressStreet,
      addressZip: addressZip,
      streetNum: streetNum,
      phoneNum: phoneNum,
      lambdaResult: "Success"
    };
  }
  else {
    console.log("Lambda returned error to Connect");
    return { lambdaResult: "Error" };
  }
}