export default function winnerHand(cards, players) {
  let t = cards;
  let hands = [];;
  let hands_r = [];
  let hands_s = [];
  let points = [];
  let i = 0;
  let counts = {};
  let count_t = 0;
  let count_p = 0;
  let tempArr_p = [];
  let flag_rf = false;
  let flag_pair = false;
  let flag_three = false;
  let flag_pok = false;
  
  let p = [];
  for(let b=0; b<players.length;b++){
      p[b]= t.concat(players[b]._cards);
      hands.push(p[b]);
      points.push(0);
  }
  console.log("p", p);

  let p_r = [];
  for(let c = 0; c<p.length; c++){
      p_r[c] = p[c].map(e => e._rank);
      hands_r.push(p_r[c]);
  }
  console.log("pr", p_r);
  
  let p_s = [];
  for(let d = 0; d<p.length; d++){
      p_s[d] = p[d].map(e => e._suit);
      hands_s.push(p_s[d])
  }
  console.log("ps", p_s);

  //Winner hand
  while(i<hands.length){
      //Same Suits ----------------------------------------------------------
      if(hands_s[i].every(v => v == "H") || hands_s[i].every(v => v == "C") || hands_s[i].every(v => v == "S") 
      || hands_s[i].every(v => v == "D")){
          //Royal Flush
          flag_rf = true;
          if(hands_r[i].includes("A") && hands_r[i].includes("Q") && hands_r[i].includes("K") 
          && hands_r[i].includes("J") && hands_r[i].includes("10")){
              points[i] += 300;   
              console.log(`Royal Flush`);
          }
          //Straight flush
          else if(hands_r[i].includes("10") && hands_r[i].includes("9") && hands_r[i].includes("8") 
          && hands_r[i].includes("7") && hands_r[i].includes("6")){
              points[i] += 250;
              console.log(`Straight Flush Player`);
              
          } 
          //Flush
          else{
              points[i] += 65;
              console.log(`Flush`);
          }
      }
      //Differents Suits ------------------------------------------------------ 
      //Straight
      else if(flag_rf == false && hands_r[i].includes("10") && hands_r[i].includes("9") && hands_r[i].includes("8") && hands_r[i].includes("7") && hands_r[i].includes("6")){
          points[i] += 100;
          flag_s = true;
          console.log(`Straight`);
      } 
      else if(flag_rf == false){
          //Splits the cards into objects, so it can counts how many incidences of a same card
          //can occur. 
          let count_fh = 0; 
          hands_r[i].forEach(l => counts[l] = (counts[l]||0)+1);
          tempArr_p.push(counts);
          counts = {};
          let arr = Object.entries(tempArr_p[i]);

          for(let m = 0; m<arr.length; m++){
              if(arr[m][1] == 4)
              {
                  //Poker
                  points[i]+= 160;
                  points[i]+= 4*(eval_r(arr[m][0]));
                  flag_poke = true;
                  console.log("Poker")
              }
              else if(arr[m][1]==3)
              {
                  //Three of a kind
                  count_t += 1;
                  count_fh += 1;
                  points[i] += 60
                  points[i]+= 3*(eval_r(arr[m][0]));
                  flag_three = true;
                  console.log("Three of a kind")
              }
              else if(arr[m][1] == 2)
              {
                  //One Pair
                  count_p += 1;
                  count_fh += 1;
                  points[i] += 15
                  points[i]+= 2*(eval_r(arr[m][0]));
                  flag_pair = true;
                  console.log("One Pair")
              }
              else if(flag_pok == false && flag_three == false && flag_pair == false)
              {
                  points[i]+=(eval_r(arr[m][0]))/10;
              }

              if(count_p == 2){
                  console.log("two_pairs")
              }
              if(count_fh ==2 && count_t>=1){
                  //Full House
                  console.log("Full House");
                  points[i] += 10;
              }

          }//End of pair and threes
          count_p = 0;
          count_t = 0;
          count_fh = 0;
          flag_pair = false;
          flag_pok = false;
          flag_three = false;
          flag_rf = false;
          
      }
      console.log(`Player ${i}: `,points[i]);
      i++
  }//End of while for winner hand
  let pw = points.indexOf(Math.max(...points));
  console.log(`Player wins ${players[pw]._user}, Score:`, Math.max(...points));
  return pw;

}//End of Winner Hand

//Function used in winner hand, depending of the coincidence returns a value
//so it can be added to the current user score and can determine who
//the winner is. 
export function eval_r(rank_p){
  let total = 0;

  switch(rank_p){
      case "A":
          total += 13;
          break;
      case "K":
          total += 12;
          break;
      case "Q":
          total += 11;
          break;
      case "J":
          total += 10;
          break;
      case "10":
          total += 9;
          break;
      case "9":
          total += 8;
          break;
      case "8":
          total += 7;
          break;
      case "7":
          total += 6;
          break;
      case "6":
          total += 5;
          break;
      case "5":
          total += 4;
          break;
      case "4":
          total += 3;
          break;
      case "3":
          total += 2;
          break;
      case "2":
          total += 1;
          break;
      default:
          total = 0;
  }

  return total

}//End of eval_r
