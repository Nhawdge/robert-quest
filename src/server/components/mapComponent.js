import Component from "./component.js";

export default class Map extends Component {
  constructor() {
    super();
  }
  displayForPlayer() {
    return `    <svg viewBox="0 0 1000 1000" width=800px>
    <style>
        .small {
            font: italic 12px sans-serif;
            padding-left: 2px;
        }
    </style>
    <g id="village">
        <image x="470" y="160" width="80" height="80" href="/icons/delapouite/village.svg" />
        //<circle cx="510" cy="200" r="3"></circle>
        <text class="small" x="540" y="200">Town</text>
    </g>
    <g id="forest">
        <image x="50" y="90" width="80" height="80" href="/icons/delapouite/forest.svg" />
        //<circle cx="90" cy="130" r="3"></circle>
        <text class="small" x="130" y="130">Forest</text>
    </g>
    <g id="cave">
        <image x="330" y="320" width="80" height="80" href="/icons/delapouite/cave-entrance.svg" />
        //<circle cx="370" cy="360" r="3"></circle>
        <text class="small" x="410" y="360">Cave</text>
    </g>
    <g id="plains">
        <image x="300" y="560" width="80" height="80" href="/icons/delapouite/grass.svg" />
        //<circle cx="340" cy="600" r="3"></circle>
        <text class="small" x="380" y="600">Plains</text>
    </g>
    <g id="mountain">
        <image x="430" y="880" width="80" height="80" href="/icons/delapouite/mountain-road.svg" />
        //<circle cx="470" cy="920" r="3"></circle>
        <text class="small" x="500" y="920">Mountain</text>
    </g>
    <g id="seaport">
        <image x="810" y="220" width="80" height="80" href="/icons/delapouite/ship-bow.svg" />
        //<circle cx="850" cy="260" r="3"></circle>
        <text class="small" x="890" y="260">Seaport</text>
    </g>
    <path stroke="black" fill="none" d="
    M 510 200 
    L 90 130
    L 370 360
    L 340 600
    L 470 920
    L 850 260
    "></path>

</svg>`;
  }
}
