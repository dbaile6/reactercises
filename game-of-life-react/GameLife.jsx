const Cell = (props)=>{
    const {i, j, cellSize, onClick, onMouseOver, isAlive} = props;
    const colr=(isAlive? 'green': 'lightgray')
    return <rect x={i*cellSize} y={j*cellSize} width={cellSize} height={cellSize} fill={colr} stroke='gray' onClick={()=>onClick(j,i)} onMouseOver={()=> onMouseOver(j,i)}/>
}

const HorizCells = (props)=>{
    const {j, cellSize, onClick, nbCol, lineCensus, onMouseOver} = props;
    return (
        <g>
            {
                R.range(0,nbCol).map((i)=>{
                    return <Cell 
                        key={i}
                        i={i}
                        j={j}
                        cellSize={cellSize}
                        onClick={onClick}
                        onMouseOver={onMouseOver}
                        isAlive={lineCensus[i]}
                    />
                })
            }
        </g>
    );


}
const Matrix = (props)=>{
    const {cellSize, onClick, nbCol, nbRow, census, onMouseOver} = props;
    return (
        <g>
            {
                R.range(0,nbRow).map((j)=>{
                    return <HorizCells
                        key={j}
                        j={j}
                        cellSize={cellSize}
                        onClick={onClick} 
                        onMouseOver={onMouseOver} 
                        nbCol={nbCol}
                        lineCensus={census[j]}
                    />
                } )
            }
        </g>
    );

}

const inTheRange=(min, maxExclude) => R.mathMod(R.__, maxExclude)
const isAlive = (x,y, census, nbCol, nbRow)=>{

    const x_=inTheRange(0, nbRow)(x)
    const y_=inTheRange(0, nbCol)(y)
    return census[x_][y_];
}


const coordinatesInRange = R.converge(R.xprod, [R.range, R.range])

const cloneAndFlip =(func) => [func, R.flip(func)]
const neighboursOfDist=  (n) => {
    const borders = [-n, n];
    const everythingInbetween = R.range(-n, n+1);
    return R.converge(R.union)( cloneAndFlip(R.xprod)) (borders, everythingInbetween);
}

const neighboursWithin = R.converge(coordinatesInRange, [R.negate, R.inc]);
const neighs=neighboursOfDist(1)

console.log(neighs)

const absoluteNeighbours = me => neighs.map(R.zipWith(R.add, me));

const immediateNeighbours = absoluteNeighbours

const doILive = (x,y, census,nbCol, nbRow)=>{
    const me = [x,y]
    const myNeighs = immediateNeighbours(me)
    const getLifeStatus= (neigh)=> isAlive(neigh[0], neigh[1], census, nbCol, nbRow)
    const neighCount =R.countBy(R.identity, myNeighs.map(getLifeStatus))[true] || 0;
    const myLife = isAlive(x,y, census, nbCol,nbRow);
    return (myLife && R.contains(neighCount,[2,3])) || neighCount === 3 

}

const createMatrix =(nbRow, nbCol, func) => R.splitEvery(nbCol)(R.xprod(R.range(0,nbRow), R.range(0,nbCol)).map(func));

const getNextGenerationFunc=(census, nbCol, nbRow)=>{
    var t0 = performance.now();
    const func = (item) => doILive(item[0],item[1], census,nbCol,nbRow);
    const res = createMatrix(nbRow, nbCol, func);
    var t1 = performance.now();
    console.log('function purely' + (t1 -t0) + 'milliseconds');

    return res
}

const randomBoolean = (x) => Math.random() < 0.5;

const randomBoolMatrix =(nbRow, nbCol) => createMatrix(nbRow, nbCol, randomBoolean);

const getRandomGeneration=(nbCol, nbRow)=>{
    return randomBoolMatrix(nbRow, nbCol);
};

class GameLife extends React.Component{
    constructor(props){
        super(props);
        const [height, width] = [400, 800];
        const cellSize=20;
        const [nbCol, nbRow] = [width, height].map(x=>x/cellSize);
        this.state={
            height,
            width,
            cellSize,
            census: randomBoolMatrix(nbRow,nbCol),
            currGen :0,
            paused : false,
            nbCol,
            nbRow,
        };
        this.onChoose=this.onChoose.bind(this);
        this.showDetails=this.showDetails.bind(this);


        this.onClear=this.onClear.bind(this);
        this.onUpdate=this.onUpdate.bind(this);
        this.onRandomize=this.onRandomize.bind(this);
        this.stop=this.stop.bind(this);
        this.start=this.start.bind(this);
        this.onManualUpdate=this.onManualUpdate.bind(this);



    }
    componentDidMount() {
        this.start(); 

    }
    start(){
        this.timeout=setTimeout(function(){this.onUpdate()}.bind(this), 1000);
        this.setState({
            paused:false,
        });

    }
    stop(){
        if(this.timeout){
            clearTimeout(this.timeout);
            this.setState({
                paused:true,
            });
        }
    }



    componentWillUnmount(){
        this.stop();
    }


    setTimer(){
        setTimeout(function(){this.onUpdate()}.bind(this), 1000);
    }
    onManualUpdate(){
        const {census, currGen, nbCol, nbRow} = this.state;
        this.setState({
            census:getNextGenerationFunc(census,nbCol, nbRow),
            currGen: currGen + 1,
        });
    }


    onUpdate(){
        const {census, currGen, nbCol, nbRow} = this.state;
        this.setState({
            census:getNextGenerationFunc(census,nbCol, nbRow),
            currGen: currGen + 1,
        });
        this.timeout=setTimeout(function(){this.onUpdate()}.bind(this), 1000);
    }
    onClear(){
        const {census} = this.state; 
        const emptyAll = R.map(R.map(R.F));
        this.setState({
            census: emptyAll(census),
            currGen: 0,
        });
    }
    onRandomize(){
        const {nbCol,nbRow} = this.state; 
        this.setState({
            census: getRandomGeneration(nbCol,nbRow),
            currGen: 0,
        });
    }
    showDetails(i,j){
        const {census,nbCol,nbRow} = this.state;
        console.log(`details about ${i} ${j}`);
        console.log(isAlive(i,j, census, nbCol, nbRow));
        console.log(doILive(i,j, census, nbCol, nbRow));

    }
    onChoose(i, j){
        const {census} = this.state;
        const lpath=R.lensPath([i,j]); 
        this.setState({
            census:R.over(lpath, R.not, census),
        }

        )
    }
    render(){
        const {height, width, cellSize, census, currGen, paused} = this.state;
        const [nbCol, nbRow] = [width, height].map(x=>x/cellSize);
        return(
            <div className='container'>
                <h2>Gen : {currGen} </h2>
                <svg height={height} width={width}>
                    <Matrix cellSize={cellSize} nbCol={nbCol} nbRow={nbRow} onClick={this.onChoose} onMouseOver={this.showDetails} census={census}/>
                    <rect width={width} height={height} fill='none' stroke='#000000'/>
                </svg>
                <br />
                <button onClick={this.onClear}><i className='fa fa-eraser fa-lg'></i> </button>
                { paused &&
                        <button onClick={this.onManualUpdate}><i className='fa fa-step-forward fa-lg'></i></button>
                }
                <button onClick={this.onRandomize}><i className='fa fa-random fa-lg'></i></button>
                { (!paused)?
                        <button onClick={this.stop}><i className='fa fa-stop fa-lg'></i></button>
                        :
                        <button onClick={this.start}><i className='fa fa-play fa-lg'></i></button>
                }
            </div>
        );

    }
}    
ReactDOM.render(<GameLife /> , document.querySelector('#root')); 
