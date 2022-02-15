const API_END_POINT = '...';

export const request = (nodeId) => {
    try {
        const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);

        if(!res.ok) {
            throw new Error('서버의 상태가 이상합니다!');
        }

        return await res.json();
    } catch(e) {
        throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
    }
}