function Nodes ({ $app, initailState }) {
    //this.변수이름 하면 프로퍼티가 됨
    this.state = initailState;

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
        this.$target.innerHTML = this.state.nodes.map(node => 
            `<li>${node.name}</li>`
        )
    }

    this.render();
}