import { useState, useEffect
} from 'react';
import { useNavigate
} from 'react-router-dom';
import { CreditCard, DollarSign, Download, Upload, Search
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment';
  amount: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

const WalletPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance
  ] = useState(0);
  const [transactions, setTransactions
  ] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading
  ] = useState(true);
  const [depositAmount, setDepositAmount
  ] = useState('');
  const [withdrawAmount, setWithdrawAmount
  ] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      const { walletBalance, transactions
      } = JSON.parse(userData);
      setBalance(walletBalance || 0);
      setTransactions(transactions || []);
    }
    setIsLoading(false);
  },
  [navigate
  ]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;

    const newTransaction: Transaction = {
      id: `txn${Date.now()
      }`,
      type: 'deposit',
      amount,
      description: 'Wallet deposit',
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    const newBalance = balance + amount;
    const newTransactions = [newTransaction, ...transactions
    ];

    // Update local state
    setBalance(newBalance);
    setTransactions(newTransactions);
    setDepositAmount('');

    // Update localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.walletBalance = newBalance;
    userData.transactions = newTransactions;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > balance) return;

    const newTransaction: Transaction = {
      id: `txn${Date.now()
      }`,
      type: 'withdrawal',
      amount,
      description: 'Wallet withdrawal',
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    const newBalance = balance - amount;
    const newTransactions = [newTransaction, ...transactions
    ];

    // Update local state
    setBalance(newBalance);
    setTransactions(newTransactions);
    setWithdrawAmount('');

    // Update localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.walletBalance = newBalance;
    userData.transactions = newTransactions;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 mb-8 rounded-lg h-48"></div>
          <div className="bg-gray-200 dark:bg-gray-700 mb-4 rounded w-1/4 h-8"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="font-bold text-gray-900 dark:text-white text-3xl">Wallet</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your SkillSwap balance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            { /* Balance Card */}
            <div className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white text-xl">Current Balance</h2>
                <CreditCard className="text-gray-400" size={
    24
  } />
              </div>
              <div className="flex items-baseline">
                <span className="font-bold text-gray-900 dark:text-white text-4xl">${balance.toFixed(2)
  }</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">USD</span>
              </div>
            </div>

            { /* Deposit/Withdraw Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              { /* Deposit Card */}
              <div className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Deposit</h3>
                  <Upload className="text-gray-400" size={
    20
  } />
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="text-gray-400" size={
    16
  } />
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={depositAmount
  }
                      onChange={(e) => setDepositAmount(e.target.value)
  }
                      className="block bg-white dark:bg-gray-800 shadow-sm py-2 pl-10 pr-3 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <button
                    onClick={handleDeposit
  }
                    disabled={!depositAmount || parseFloat(depositAmount) <= 0
  }
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 border border-transparent rounded-md font-medium text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Deposit Funds
                  </button>
                </div>
              </div>

              { /* Withdraw Card */}
              <div className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Withdraw</h3>
                  <Download className="text-gray-400" size={
    20
  } />
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="text-gray-400" size={
    16
  } />
                    </div>
                    <input
                      type="number"
                      min="0"
                      max={balance
  }
                      step="0.01"
                      value={withdrawAmount
  }
                      onChange={(e) => setWithdrawAmount(e.target.value)
  }
                      className="block bg-white dark:bg-gray-800 shadow-sm py-2 pl-10 pr-3 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <button
                    onClick={handleWithdraw
  }
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance
  }
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 border border-transparent rounded-md font-medium text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Withdraw Funds
                  </button>
                </div>
              </div>
            </div>
          </div>

          { /* Transaction History */}
          <div className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900 dark:text-white text-xl">Transaction History</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={
    16
  } />
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Search transactions..."
                />
              </div>
            </div>

            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id
    }
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'deposit'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : transaction.type === 'withdrawal'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
      }`
    }>
                        {transaction.type === 'deposit' ? (
                          <Upload size={
        16
      } />
                        ) : transaction.type === 'withdrawal' ? (
                          <Download size={
        16
      } />
                        ) : (
                          <DollarSign size={
        16
      } />
                        )
    }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.description
    }
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.timestamp).toLocaleDateString()
    }
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'deposit'
                          ? 'text-green-600 dark:text-green-400'
                          : transaction.type === 'withdrawal'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-blue-600 dark:text-blue-400'
      }`
    }>
                        {transaction.type === 'deposit' ? '+' : '-'
    }${transaction.amount.toFixed(2)
    }
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {transaction.status
    }
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No transactions yet
                </div>
              )
  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;