import React,{Component} from 'react';
import {render} from 'react-dom';
import BankBalanceStore from './BankBalanceStore'
import BankActions from './BankActions'

class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = {
            balance: BankBalanceStore.getState(),
            validate: true
        }
    }

    componentDidMount() {
        this.storeSubscription = BankBalanceStore.addListener(
            data => this.handleStoreChange(data)
        );
    }

    componentWillUnmount() {
        this.storeSubscription.remove();
    }

    handleStoreChange() {
        this.setState({
            balance: BankBalanceStore.getState()
        })
    }

    validateAmount() {
        if (this.refs.ammount.value == 0 || this.refs.ammount.value == '') {
            this.setState({validate: false});
            console.log(this.state.validate);
            return false;
        }
        else {
            this.setState({validate: true});
            return true;
        }
    }

    deposit() {
        this.validateAmount();
        BankActions.depositIntoAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = '';
    }

    withdraw() {
        this.validateAmount();
        BankActions.withdrawFromAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = '';
    }

    render() {
        return (
            <div>
                <header>FluxTrust Bank</header>
                <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
                <div className="atm">
                    <input type="text" placeholder="Enter Ammount" ref="ammount"/>
                    {!this.state.validate ? (
                        <p>Amount muse be > 0</p>
                    ) : ''}
                    <br/>
                    <button onClick={this.withdraw.bind(this)}>Withdraw</button>
                    <button onClick={this.deposit.bind(this)}>Deposit</button>
                </div>
            </div>
        )
    }
}

render(<App/>, document.getElementById('root'))