function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth
    });

    const nodes = new Nodes({
        $app,
        initailState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        //함수를 파라메터로 던지고, Nodes 내에서 click 발생시 이 함수를 호출하게 함.
        //이러면 Nodes 내에선 click 후 어떤 로직이 일어날지 알아야 할 필요가 없음.
        onClick: (node) => {
            if(node.type === 'DIRECTORY') {

            } else if(node.type === 'FILE') {

            }
        }
    });

    this.setState = (nextState) => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
    }

    const init = async () => {
        try {
            const rootNodes = await request();
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch(e) {
            //에러처리
        }
    }

    init();
}