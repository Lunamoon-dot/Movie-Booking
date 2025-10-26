export const KConverter = (num)=>{
  if(num >= 1000 && num < 1000000){
   const a = (num/1000).toFixed(1) + 'k';
    return a;
  }
  else if(num>=1000000){
    return (num/1000000).toFixed(1) + 'm';
  }
  else{
    return num;
  }
}