import ImageView from '../view/ImageView.js';
import Breadcrumb from '../view/Breadcrumb.js';
import Nodes from '../view/Nodes.js';
import { request } from '../util/api.js';

export default function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: [],
        selectedFilePath: null
    }

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedFilePath
    });

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
        onClick: async (node) => {
            try {
                if(node.type === 'DIRECTORY') {
                    const nextNodes = await request(node.id);
                    this.setState({
                        ...this.state,
                        depth: [...this.state.depth, node],
                        nodes: nextNodes
                    })
                } else if(node.type === 'FILE') {
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    })
                }
            } catch(e) {
                //에러처리
            }
        },
        onBackClick: async() => {
            try {
                //이전 state를 복사하여 처리
                const nextState = {...this.state};
                nextState.depth.pop();

                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

                //root로 온 경우이므로 root 처리
                if (prevNodeId === null) {
                    const rootNodes = await request();
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: rootNodes
                    })
                } else {
                    const prevNodes = await request(prevNodeId);

                    this.setState({
                        ...nextState,
                        isRoot: false,
                        nodes: prevNodes
                    })
                }
            } catch (e) {
                //에러처리
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
        imageView.setState(this.state.selectedFilePath);
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