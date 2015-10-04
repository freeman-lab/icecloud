module.exports = function (params, tag) {

  ec2.runInstances(params, function(err, data) {

    if (err) { 
      console.log("Could not create instance", err); return; 
    }

    var instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);

    params = {
      Resources: [instanceId], 
      Tags: [{Key: 'Name', Value: tag}]
    };

    ec2.createTags(params, function(err) {
      console.log("Tagging instance", err ? "failure" : "success");
    });

  })

};