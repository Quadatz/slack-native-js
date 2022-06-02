import groupList from "./components/group-list";
import groupInfo from "./components/group-info";
import dialogueWindow from "./components/dialogue-window";
import messages from "./components/messages";

import changeState from './components/changeState'
import GetService from "./services/GetService";

window.addEventListener('DOMContentLoaded', () => {
    const state = {
        currentGroup: 0,
        currentChannel: 0,
        searchQuery: '',
        data: {

        },
        getCurrentGroup() {
            return this.data.servers[this.currentGroup];
        },
        getCurrentChannel() {
            return this.getCurrentGroup().channels[this.currentChannel];
        }
    }

    const setState = (key, value) => {
        state[key] = value;
        update();
        console.log(state);
    }

    const getService = new GetService();
    getService.getResource('/quadath')
        .then(res => {
            state.data = res;
            update();
        });

    function update() {
        groupList(state);
        groupInfo(state);
        dialogueWindow(state);
        messages(state);
        

        changeState(state, setState);
    }

});
