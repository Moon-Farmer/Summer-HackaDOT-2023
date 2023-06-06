import { waitReady } from "@polkadot/wasm-crypto";
import Sdk from '@unique-nft/sdk';
import { KeyringProvider } from "@unique-nft/accounts/keyring";

export const Watering = ({sdk, signer, id}) => {
    const baseUrl = 'https://rest.unique.network/opal/v1';
    function createSdk(account) {
        const options = {
            baseUrl,
            signer: account,
        }
        return new Sdk(options);
    }

    const checkInterval = async () => {
        const date_time = Date.now();
        console.log('date now', date_time);
        //get time property
        const args = {
            collectionId: 1619,
            tokenId: id,
        };
        const child_result = await sdk.token.children(args);
        console.log('child',child_result);
        for(let i=0; i<child_result.children.length;i++){
            // if(child_result.children[i].collectionId==1639){
                const timeArgs = {
                    collectionId: 1639,
                    tokenId: 6,
                    // child_result.children[i].tokenId,
                    propertyKeys: ['a.2'],
                }
                const time_result = await sdk.token.properties(timeArgs);
                if((date_time - time_result.properties[0].value) > 1000) {
                    return true;
                }
            // }
        }
        return false;
    }

    const confirm_water = async () => {
        const canWater = await checkInterval();
        if(canWater){
            console.log('can water');
            const date_time = Date.now();
            const owner_mnemonic = 'robot huge puzzle shoulder connect violin ensure able front umbrella learn harsh';
            const owner_account = await KeyringProvider.fromMnemonic(owner_mnemonic);
            const owner_address = owner_account.address;
            const owner_sdk = createSdk(owner_account);
            const args = {
                collectionId: 1619,
                tokenId: id,
            };
            const child_result = await sdk.token.children(args);
            for(let i=0; i<child_result.children.length;i++){
                if(child_result.children[i].collectionId==1639){
                    //change time
                    const datetimeargs = {
                        address: owner_address,
                        collectionId: 1639,
                        tokenId: child_result.children[i].tokenId,
                        properties: [{
                            key: 'a.2',
                            value: date_time,
                        }]
                    };
                    const datetimeres = await owner_sdk.token.setProperties.submitWaitResult(datetimeargs);
                    console.log(datetimeres);
                    //get remain watering time
                    const remainargs = {
                        collectionId: 1639,
                        tokenId: child_result.children[i].tokenId,
                    };
                    const res = await owner_sdk.token.properties(remainargs);
                    console.log('properties',res);
                    //if remain 1 time, state +1, remain time = 3
                    if(res.properties[3].value==1){
                        const nextstate = parseInt(res.properties[1].value)+1;
                        const stateargs = {
                            address: owner_address,
                            collectionId: 1639,
                            tokenId: child_result.children[i].tokenId,
                            properties: [{
                                key: 'a.1',
                                value: nextstate
                            }]
                        };
                        const stateres = await owner_sdk.token.setProperties.submitWaitResult(stateargs);
                        console.log('state', stateres);

                        const addremainargs = {
                            address: owner_address,
                            collectionId: 1639,
                            tokenId: child_result.children[i].tokenId,
                            properties: [{
                                key: 'a.3',
                                value: 3
                            }]
                        };
                        const addremainres = await owner_sdk.token.setProperties.submitWaitResult(addremainargs);
                    }else{//else, watering time -1
                        const nextremain = parseInt(res.properties[3].value)-1;
                        const minusremainargs = {
                            address: owner_address,
                            collectionId: 1639,
                            tokenId: child_result.children[i].tokenId,
                            properties: [{
                                key: 'a.3',
                                value: nextremain
                            }]
                        };
                        const minusremainres = await owner_sdk.token.setProperties.submitWaitResult(minusremainargs);
                    }
                }
            }
        }
    }

    return(
        <>
        <div>
            <button
                onClick={confirm_water}
                className="text-2xl mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-400 shadow-lg shadow-amber-400/50 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:-translate-y-1 hover:scale-110 hover:bg-amber-600">
                    Confirm
            </button>
        </div>
        </>
    )
}