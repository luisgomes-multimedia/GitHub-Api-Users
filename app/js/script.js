console.log('ready');

var input;
var btn = $('#submitBtn');

btn.on('click' , function(){
   input = $('#user').val();

   $.ajax({
      url: "https://api.github.com/users/" + input
   }).done(function(data) {
      var bio = data.bio;
      if(bio == null){
         bio = "No bio available";
      }
      $.ajax({
         url: "https://api.github.com/users/" + input + "/repos"
      }).done(function(repos){
         console.log(repos);
         $.each(repos, function(index , repo){
            $('#repos').append('<div class="card-action hoverable justify-content-between"><li class="collection-item">'+ repo.name +'</li><div class="flex"><span class="align-number-icon "><img src="./css/icons/star.svg" alt=""></span><span class="margin-right">'+ repo.stargazers_count +'</span></span><span class="align-number-icon"><img src="./css/icons/git-branch.svg" alt=""></span><span>'+ repo.forks_count +'</span></span></div></div>');


         })
      });
      $('#result').html('<div class="valign-wrapper flex-wrap row no-margin-bottom">' +
                           '<div class="col s12 m4">'+
                              '<div class="card-image"><img class="responsive-img " src="'+ data.avatar_url +'"></div>'+
                           '</div>'+
                     '<div class="col s12 m8  text-align-center-small padding-when-small">' +
                        '<a class="italic yellow-text text-darken-1" href="#">@'+ data.login +'</a>'+
                        '<h5 class="bold">'+ data.name +'</h5>'+
                        '<p class="text-justify line-clamp">'+ bio +'</p>'+
                     '</div></div>'+ '<div id="repos" class="ul"><div class="card-action"><h6 class="bold">Repositories</h6></div>')

})
.fail(function(){
   $('#erro').addClass('scale-in');
   setTimeout(function(){
      $('#erro').removeClass('scale-in');
   },2000);
   $('#result').html('');
});
});
