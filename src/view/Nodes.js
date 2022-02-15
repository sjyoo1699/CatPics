// onClick은 함수이며, 클릭한 Node의 type과 id를 파라메터로 넘겨받도록 함
export default function Nodes ({ $app, initailState, onClick, onBackClick }) {
    //this.변수이름 하면 프로퍼티가 됨
    this.state = initailState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    //Nodes 컴포넌트를 렌더링 할 DOM을 this.$target 이라는 이름으로 생성
    this.$target = document.createElement('ul');
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    //현재 상태(this.state) 기준으로 렌더링
    //map이 리턴된 이후 join()을 하지 않아도 되는지?
    this.render = () => {
        // this.$target.innerHTML = this.state.nodes.map(node => 
        //     `<li>${node.name}</li>`
        // )
        if(this.state.nodes) {
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png';

                return `
                    <div class = "Node" date-node-id="${node.id}">
                        <img src = "${iconPath}" />
                        <div>${node.name}</div>
                    </div>
                `;
            }).join('');

            //root directory 렌더링이 아닌 경우 뒤로가기를 렌더링
            //뒤로가기의 경우 data-node-id attribute를 렌더링하지 않음
            this.$target.innerHTML = !this.state.isRoot ? `<div class = "Node"><img src="/assets/prev.png"></div>${nodesTemplate}` : nodesTemplate;
        }

        // 렌더링된 이후 클릭 가능한 모든 요소에 click 이벤트 걸기
        this.$target.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                //dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
                const { nodeId } = e.target.dataset;
                //nodeId가 없는 경우 뒤로가기를 누른 케이스
                if(!nodeId) {
                    this.onBackClick();
                }

                const selectedNode = this.state.nodes.find(node => node.id === nodeId);

                if(selectedNode) {
                    this.onClick(selectedNode);
                }
            })
        });
    }

    this.render();
}