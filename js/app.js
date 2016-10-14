var moreButton = document.querySelector('.moreBut')
var congressHolder = document.querySelector('.peopleInfoHolder')
var dropButHolder = document.querySelector('.navButHolder')
var dropBut = document.querySelector('.navBut')

var addMoreNumb = 1
var congressLink = 'https://congress.api.sunlightfoundation.com/legislators?page=' + addMoreNumb + '&per_page=10&apikey=ca7e5da974f1431cba49e128def60736'
var dataHolder = ''


// https://congress.api.sunlightfoundation.com/legislators?page=&per_page=10&apikey=ca7e5da974f1431cba49e128def60736



$.getJSON(congressLink, function (data){

   dataHolder = data.results

   forEach(data.results, createThis)
})


var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i])
   }
}

var dropThis = function(){
   if (dropButHolder.classList.contains('open')) {

      dropButHolder.classList.remove('open')
      dropBut.setAttribute("aria-expanded", false)

   } else {

      dropButHolder.classList.add('open')
      dropBut.setAttribute("aria-expanded", true)
   }
}

var findParty = function(partyStr){
   var partyColor = ''
   if (partyStr === 'R'){
      partyColor = 'RGBA(207, 0, 15, 0.9)'

      return partyColor
   } else if (partyStr === 'D'){
      partyColor = 'RGBA(52, 152, 219, 0.9)'

      return partyColor
   } else {
      partyColor = 'RGBA(38, 166, 91, 0.9)'

      return partyColor
   }
}

var addMore = function(){
   addMoreNumb = addMoreNumb + 1

   congressLink = 'https://congress.api.sunlightfoundation.com/legislators?page=' + addMoreNumb + '&per_page=10&apikey=ca7e5da974f1431cba49e128def60736'


   $.getJSON(congressLink, function (moreData){

      dataHolder = moreData.results

      forEach(moreData.results, createThis)
   })

}



var createThis = function(curntMan){

   var fullName = curntMan.first_name + ' ' + curntMan.last_name
   var fullLabel = curntMan.title + ' -- ' + curntMan.party + ' - ' + curntMan.state_name
   var emailAdr = curntMan.oc_email
   var webAdr = curntMan.website
   var faceBookId = curntMan.facebook_id
   var twitter = curntMan.twitter_id
   var termEnd = 'Term ends: ' + curntMan.term_end
   var profImg = function(fbId){ return "http://graph.facebook.com/" + fbId + "/picture?type=normal"}
   var defImg = "http://graph.facebook.com/" + 4 + "/picture?type=normal"


   var backgdColor = findParty(curntMan.party)




   var newDiv1 = document.createElement('div')
      newDiv1.classList.add('col-sm-4', 'congressPeople')
      congressHolder.appendChild(newDiv1)
   var newDiv2 = document.createElement('div')
      newDiv2.classList = 'thumbnail'
      newDiv2.style.backgroundColor = backgdColor

      newDiv1.appendChild(newDiv2)
   var newImg = document.createElement('img')
      newImg.classList = 'profPic'
      newImg.src = profImg(faceBookId)
      newImg.onerror = function(){
         newImg.src = profImg('undefined')
         console.log(fullName)
         return
      }
      newDiv2.appendChild(newImg)
   var newDiv3 = document.createElement('div')
      newDiv3.classList = 'caption'
      newDiv2.appendChild(newDiv3)
   var newH4 = document.createElement('h4')
      newH4.textContent = fullName
      newDiv3.appendChild(newH4)
   var newH5 = document.createElement('h5')
      newH5.textContent = fullLabel
      newDiv3.appendChild(newH5)
   var newListHolder = document.createElement('ul')
      newDiv3.appendChild(newListHolder)
   var newLi1 = document.createElement('li')
      newLi1.textContent = 'Email: ' + emailAdr
      newListHolder.appendChild(newLi1)
   var newLi2 = document.createElement('li')
      newLi2.textContent = 'Website: ' + webAdr
      newListHolder.appendChild(newLi2)
   var newLi3 = document.createElement('li')
      newLi3.textContent = 'Facebook: ' + faceBookId
      newListHolder.appendChild(newLi3)
   var newLi4 = document.createElement('li')
      newLi4.textContent = 'Twitter: ' + twitter
      newListHolder.appendChild(newLi4)
   var newPTag = document.createElement('p')
      newPTag.textContent = termEnd
      newDiv3.appendChild(newPTag)


}


moreButton.addEventListener('click', addMore)
dropBut.addEventListener('click', dropThis)
