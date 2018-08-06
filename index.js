document.pointCoord = []
document.pointDel = []
document.personage = {}
document.demo = document.getElementById("demo")

function setWayPoint ( event ) {
   if ( event.target.tagName == "BUTTON" ) return
   var x = Math.round ( event.clientX )
   var y = Math.round ( event.clientY )
   document.pointCoord.push ( [ x, y ] )
   var point = document.createElement ( 'div' )
   point.className = 'point'
   point.style.left = x + 'px'
   point.style.top =  y + 'px'
   point.innerHTML = ""
   document.pointDel.push(point)
   document.body.appendChild ( point )
}
function setPersonage () {
    if ( document.pointCoord.length === 0 ) {
        document.demo.innerHTML = "Траектория не задана"
        return
    }
    document.demo.innerHTML = ""
    if ( !document.personage.interval ) {
        document.personage = document.createElement ('img')
        document.personage.src = "http://25.media.tumblr.com/03f4da17fb89ade647863d640eddbfba/tumblr_msv2wqoLW11qiv1fao1_1280.gif"
        document.personage.className = "personage"
        document.body.appendChild ( document.personage )
        document.personage.coord = document.pointCoord [0]
        document.personage.nextPoint = 0
        document.personage.interval = setInterval ( mc_personage, 100 )
    }
}
// ---------------- Положение персонажа ----------------
var per = 70
function mc_personage ( event ) {
   document.personage.style.width = per + "px"
   var dimX = document.pointCoord [ document.personage.nextPoint ][0] -
               document.personage.coord [0]
   var dimY = document.pointCoord [ document.personage.nextPoint ][1] -
               document.personage.coord [1]
   if ( Math.abs ( dimX ) < 5 && Math.abs ( dimY ) < 5 ) {
       if ( document.personage.nextPoint < document.pointCoord.length-1 ) {
          var del = document.pointDel[ document.personage.nextPoint++]
          del.parentNode.removeChild(del)
          per+=15
       } else {
          var del = document.pointDel[ document.personage.nextPoint]
          del.parentNode.removeChild ( del )
          document.personage.src = "https://img1.picmix.com/output/stamp/thumb/2/1/0/0/600012_4cf11.gif"
          setTimeout (function(){
             document.personage.parentNode.removeChild (document.personage)
          },2000)
          clearInterval(document.personage.interval)
          document.pointCoord = []
          document.pointDel = []
          per = 70
          document.personage.interval = null
       }
   } else {
   }
   document.personage.style.transform = dimX < 0 ?
            "rotateY(0deg)" : "rotateY(180deg)"
   document.personage.coord [0] += dimX !== 0 ? Math.sign( dimX ) * 5 : 0
   document.personage.coord [1] += dimY !== 0 ? Math.sign( dimY ) * 5 : 0
   document.personage.style.left = document.personage.coord [0] + 'px';
   document.personage.style.top = document.personage.coord [1] + 'px';
}
