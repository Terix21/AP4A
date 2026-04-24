import { useState } from 'react';
import { Coins, Package } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { TradeManager } from '../systems/TradeManager';

export default function TradePost() {
  const credits = useGameStore(state => state.credits);
  const scrap = useGameStore(state => state.scrap);
  const mats = useGameStore(state => state.buildingMats);
  const activeSLAs = useGameStore(state => state.activeSLAs);
  const addActiveSLA = useGameStore(state => state.addActiveSLA);

  const [tradeAmount, setTradeAmount] = useState<number>(100);

  const signSLA = () => {
    if (scrap >= 1000 && mats >= 2000) {
      useGameStore.getState().addScrap(-1000);
      useGameStore.getState().addMats(-2000);
      addActiveSLA(50); // Generates 50 CR / hour
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 pointer-events-auto">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight drop-shadow-md">
          Trade Post
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-300 drop-shadow-sm">
          Exchange excess resources for Corporate Credits.
        </p>
      </div>

      <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-md p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
          <h3 className="text-xl font-semibold text-yellow-400 flex items-center">
            <Coins className="w-6 h-6 mr-2" /> 
            Balance: {credits} CR
          </h3>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <label className="text-sm text-gray-300">Transaction Batch Size:</label>
          <select 
            value={tradeAmount} 
            onChange={(e) => setTradeAmount(Number(e.target.value))}
            className="bg-gray-800 text-white border border-gray-600 rounded p-2"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-950/80 p-5 rounded-lg border border-orange-900/50">
            <div className="font-bold text-orange-300 flex items-center mb-2"><Package className="w-4 h-4 mr-2"/> Neon Scrap</div>
            <div className="text-sm text-gray-400 mb-4">Inventory: {Math.floor(scrap)}</div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => TradeManager.sellScrap(tradeAmount)}
                disabled={scrap < tradeAmount}
                className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white py-2 rounded text-sm transition-colors"
              >
                Sell {tradeAmount} ( +{Math.floor(tradeAmount/10)} CR )
              </button>
              <button 
                onClick={() => TradeManager.buyScrap(tradeAmount)}
                disabled={credits < Math.ceil(tradeAmount/10)*2}
                className="flex-1 bg-yellow-900/50 hover:bg-yellow-800/50 disabled:opacity-50 text-yellow-100 py-2 rounded text-sm transition-colors border border-yellow-700/50"
              >
                Buy {tradeAmount} ( -{Math.ceil(tradeAmount/10)*2} CR )
              </button>
            </div>
          </div>

          <div className="bg-gray-950/80 p-5 rounded-lg border border-blue-900/50">
            <div className="font-bold text-blue-300 flex items-center mb-2"><Package className="w-4 h-4 mr-2"/> Building Mats</div>
            <div className="text-sm text-gray-400 mb-4">Inventory: {Math.floor(mats)}</div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => TradeManager.sellMats(tradeAmount)}
                disabled={mats < tradeAmount}
                className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white py-2 rounded text-sm transition-colors"
              >
                Sell {tradeAmount} ( +{Math.floor(tradeAmount/5)} CR )
              </button>
              <button 
                onClick={() => TradeManager.buyMats(tradeAmount)}
                disabled={credits < Math.ceil(tradeAmount/5)*2}
                className="flex-1 bg-yellow-900/50 hover:bg-yellow-800/50 disabled:opacity-50 text-yellow-100 py-2 rounded text-sm transition-colors border border-yellow-700/50"
              >
                Buy {tradeAmount} ( -{Math.ceil(tradeAmount/5)*2} CR )
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Corporate Contracts (SLAs)</h3>
          <div className="bg-gray-950/80 p-5 rounded-lg border border-purple-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="font-bold text-purple-300">Standard Resource SLA</div>
              <div className="text-sm text-gray-400">Cost: 1,000 Scrap, 2,000 Mats</div>
              <div className="text-xs text-gray-500 mt-1">Grants a permanent +50 CR / hour generation.</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-bold text-white mb-2">Active Contracts: {activeSLAs}</div>
              <button 
                onClick={signSLA}
                disabled={scrap < 1000 || mats < 2000}
                className="bg-purple-900/50 hover:bg-purple-800/50 disabled:opacity-50 text-purple-100 py-2 px-6 rounded text-sm transition-colors border border-purple-700/50"
              >
                Sign Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
