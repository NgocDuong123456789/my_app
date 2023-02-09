interface PositionType{
    position:{x:number, y:number},
}

export const Ads = (props: PositionType) => {
    const {position }= props
  return (
    <div>
        <img src="https://tse1.mm.bing.net/th?id=OIP.0pgyUCIOys-Liq86dJ7YFAHaJQ&pid=Api&P=0"  alt="website ui" style={{width:'100rem', height:"auto" }}/>
        <p>Position Mouse</p>
        <ul>
            <li>x:{position.x}</li>
            <li>y:{position.y}</li>
            
        </ul>
    </div>
  )
}
