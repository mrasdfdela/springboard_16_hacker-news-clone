"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    currentUser ? addFavIcons(story) : ''
  }

  $allStoriesList.show();
}

function addFavIcons(story) {
  const userFavs = currentUser.favorites.map((el) => el.storyId);
  let favIndicator = userFavs.includes(story.storyId) ? "fas" : "far";
  
  const $newFavIcon = $('<i>')
  $newFavIcon.addClass(['fa-star',favIndicator])
  $(`#${story.storyId}`).prepend($newFavIcon);
}

// Submits new stories using data from forms
async function addNewStory() {
  console.debug("addNewStory")

  const $newStoryAuthor = $("#new-story-author");
  const $newStoryTitle = $("#new-story-title");
  const $newStoryUrl = $("#new-story-url");
  
  const storyFormData = {
    author: $newStoryAuthor.val(),
    title: $newStoryTitle.val(),
    url: $newStoryUrl.val()
  }
  await StoryList.addStory(currentUser, storyFormData);
  
  $newStoryForm.trigger("reset");
  getAndShowStoriesOnStart();
}

$newStoryForm.on("submit", (e)=>{
  e.preventDefault();
  addNewStory();
});

function updateFavIcon(id, favIcon) {

  if (currentUserFavs.includes(id)) {
    favIcon.addClass("fas");
    favIcon.removeClass("far");
  } else {
    favIcon.addClass("far");
    favIcon.removeClass("fas");
  }
}

// Toggle display of favorite items
function toggleFavsDisplay(){
  // favIds = currentUserFavs 
  // console.log($allStoriesList.children("li"));

  // Question: How would I do this using jQuery? It looks like 'storyLi' is not a jQuery object, so I am  
  // const storyEls = $allStoriesList.children("li");
  // for (let storyLi of storyEls) {
  //   let id = storyLi.id;
  //   if (currentUserFavs.includes(id)) {
  //     console.log(storyLi);
  //     storyLi.classList.toggle("story-hidden");
  //   }
  // }
}

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for favorites
  for (let story of storyList.stories) {
    if (currentUserFavs.includes(story.storyId)) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  }

  $allStoriesList.show();
}