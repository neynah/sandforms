if (Meteor.isClient) {

  Template.create.helpers({
    prompts: function() {
      return Prompts.inOrder();
    },
    promptRequired: function() {
      //return (prompt.required == "") ? 1 : prompt.required;
      return 1;
    }
  });

  Template.create.events({
    "submit #create-prompt-form": function (event) {
      event.preventDefault();
      var text = event.target.prompt.value;

      Prompts.create(text);
      event.target.prompt.value = "";
    },

    "keyup .prompt": _.debounce(function (event) {
      event.preventDefault();
      var text = event.target.value;
      var promptId = $(event.target).data('prompt-id');

      Prompts.update(
        {_id: promptId},
        {$set: {"text": text}}
      );
    }, 200),

    "change #prompt-type-select": function (event, template) {
      var type = $(event.currentTarget).val();
      var promptId = $(event.target).data('prompt-id');
      Prompts.update(
        {_id: promptId},
        { $set: {"selectedPromptType": type}}
      );
    },

    "click .chbRequired": function (event) {
      event.preventDefault();
      var isChecked = event.target.checked;
      var promptId = $(event.target).data('prompt-id');

      Prompts.update(
        {_id: promptId},
        {$set: {"required": isChecked}}
      );
    },

    "click .prompt__remove":function(prompt){
      Prompts.markAsDeleted(this._id);
    },

    "click .requiredToggle":function(prompt){
      console.log(this._id);
    }
  });
}
