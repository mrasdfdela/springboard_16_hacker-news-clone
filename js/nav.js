"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navSubmitStory.show();
  $navViewFavs.show();
  $navViewAll.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// Listener for when users click submit in nav b

function navSubmitStory() {
  console.debug("navSubmitStory");
  hidePageComponents();
  $newStoryForm.show();
}

$navSubmitStory.on("click", navSubmitStory);

function updateNavViewFavorites() {
  $navViewFavs.toggle();
  $navViewAll.toggle();
}

$navView.on("click",function(e){
  updateNavViewFavorites()
  switch (e.target.id) {
    case 'nav-view-favs':
      putFavoriteStoriesOnPage();
      break;
    case 'nav-view-all':
      putStoriesOnPage();
      break;
  }
});