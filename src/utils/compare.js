const compare =(prev, next)=> {
    let val = 0;
    prev = parseInt(prev)
    next = parseInt(next)
    if(prev && next && prev !== null && next !==null && prev !== undefined && next !== undefined)
        val = prev > next ? 1 : prev === next? 0 : -1;
    return val;
}
const setOddsUpdate = (prev, next) => {
    // console.log('comparing');
    next.forEach(element => {
        let idx = next.indexOf(element)
        if(prev[idx] && prev[idx].id === element.id){
            // Here we check if the odds are updated
            const prevOdds = prev[idx].betState
            const nextOdds = next[idx].betState
            // matchOdds102
            let keyIdx = 0
            while(keyIdx < 3){
                let key = 'o' + keyIdx
                // console.log(idx, key, prevOdds.matchOdds102[key], nextOdds.matchOdds102[key])
                next[idx].betState.matchOdds102['u' + keyIdx] = 0
                if (prevOdds.timestamp !== nextOdds.timestamp) {
                    // console.log(idx, 'timestamps different')
                    next[idx].betState.matchOdds102['u' + keyIdx] = compare(prevOdds.matchOdds102[key], nextOdds.matchOdds102[key])
                    // console.log(next[idx].match.awayTeam, next[idx].match.homeTeam, 'changed? ', next[idx].betState.matchOdds102['u' + keyIdx])
                }
                else if(prevOdds.timestamp === nextOdds.timestamp){
                    // console.log(idx, 'timestamps same')
                    next[idx].betState.matchOdds102['u' + keyIdx] = prev[idx].betState.matchOdds102['u' + keyIdx]
                }
                keyIdx ++
            }
        }
    });
    // console.log(prev, next)
}
const OddCompareFunctions = {
    compare, 
    setOddsUpdate
}
export default OddCompareFunctions;