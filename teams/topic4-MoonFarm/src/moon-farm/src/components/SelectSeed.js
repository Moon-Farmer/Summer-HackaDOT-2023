import { useState, useEffect } from 'react';
import { SchemaTools, COLLECTION_SCHEMA_NAME, AttributeType } from '@unique-nft/schemas';
import { burnToken, mintToken, nestToken } from '../utils/Game';
import Sdk from '@unique-nft/sdk';
import { KeyringProvider } from "@unique-nft/accounts/keyring";
import { transfer } from '../utils/Game';
import { LandQuery } from "./Query/LandQuery";
import { SeedQuery } from './Query/SeedQuery';

const baseUrl = 'https://rest.unique.network/opal/v1';

export const SelectSeed = ({sdk, signer, id}) => {
    //States
    const [haveSeedA, setSeedA] = useState(false);
    const [haveSeedB, setSeedB] = useState(false);
    //Query States
    const [landLastRes, setLandLastRes] = useState(null);
    const [seedLastRes, setSeedLastRes] = useState(null);

    const getSeedBalance = async () => {
        let seedbalance = new Array(0,0);
        //get seed id
        const res_result = seedCurrentRes;

        for (let i=0; i<res_result.length; i++){
            const propertyArgs = {
                collectionId: 1639,
                tokenId: res_result[i].token_id,
                propertyKeys: ['a.0'],
            }
            const properties_result = await sdk.token.properties(propertyArgs);
            if (properties_result.properties[0].value=='{"_":"seedA"}') {
                setSeedA(true);
                seedbalance[0] = res_result[i].token_id;
                // console.log('seedA');
            }else if(properties_result.properties[0].value=='{"_":"seedB"}') {
                setSeedB(true);
                seedbalance[1] = res_result[i].token_id;
                // console.log('seedB');
            }
        }
        // console.log('inside get',seedbalance);
        return {seedbalance}
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const seed_id = await getSeedBalance();
            // console.log('interval seed_id', seed_id);
            // console.log('test signer',signer.address);
        }, 3000);
    })

    //if balance > 0, show select button

    //SeedSchema
    const SeedSchema = {
        schemaName: COLLECTION_SCHEMA_NAME.unique,
        schemaVersion: '1.0.0',
        image: {urlTemplate: 'https://ipfs.unique.network/ipfs/QmcAcH4F9HYQtpqKHxBFwGvkfKb8qckXj2YWUrcc8yd24G/image{infix}.png'},
        coverPicture: {urlInfix: '0'},

        attributesSchemaVersion: '1.0.0',
        attributesSchema: {
            0: {
                name: {_: "S"},
                type: AttributeType.string,
                optional: true,
                isArray: false,
            },
        }
    }

    //mint seed
    const burnNmintNnest_seed = async (type) => {
        function createSdk(account) {
            const options = {
                baseUrl,
                signer: account,
            }
            return new Sdk(options);
        }
        const owner_mnemonic = 'robot huge puzzle shoulder connect violin ensure able front umbrella learn harsh';
        const owner_account = await KeyringProvider.fromMnemonic(owner_mnemonic);
        const owner_address = owner_account.address;
        const owner_sdk = createSdk(owner_account);
        const working_seed = await getSeedBalance();
        console.log('working',working_seed);
<<<<<<< HEAD
        const s_address = signer.address;
=======
>>>>>>> 96106bff792686a77d0fa1ea0a6f30a4d307768e
        // console.log('seed A amount', working_seed.seedbalance[0]);
        // console.log('seed B amount', workingSeedB);

        //get land id
        const land_token_id = id;
        console.log('query land id', land_token_id);
        if (type=='A') {
            const nested = await nestToken(owner_sdk, {
<<<<<<< HEAD
                address: s_address,
=======
                address: owner_address,
>>>>>>> 96106bff792686a77d0fa1ea0a6f30a4d307768e
                parent: {
                    collectionId: 1619,
                    tokenId: land_token_id,
                },
                nested: {
                    collectionId: 1639,
                    tokenId: working_seed.seedbalance[0],
                }
            });
            console.log('nest token', nested);

            //set timestamp
            const date_time = Date.now();
            console.log(date_time);
            const _mnemonic = 'robot huge puzzle shoulder connect violin ensure able front umbrella learn harsh';
            const _adminAccount = await KeyringProvider.fromMnemonic(_mnemonic);
            const _adminSdk = new Sdk({
                baseUrl: 'https://rest.unique.network/opal/v1',
                signer: _adminAccount,
            });
            

            const args = {
                address: _adminAccount.address,
                collectionId: 1639,
                tokenId: working_seed.seedbalance[0],
                properties: [{
                    key: 'a.2',
                    value: date_time
                }]
            };
            const res = await _adminSdk.token.setProperties.submitWaitResult(args);
            console.log(res);

            const state_args = {
                address: _adminAccount.address,
                collectionId: 1639,
                tokenId: working_seed.seedbalance[0],
                properties: [{
                    key: 'a.1',
                    value: 0
                }]
            };
            const state_res = await _adminSdk.token.setProperties.submitWaitResult(state_args);
            console.log(state_res);
        }else{
            //nest seed into land collection

<<<<<<< HEAD
            const nested = await nestToken(owner_sdk, {
                address: s_address,
=======
            // const s_address = signer.address;
            // const s_sdk = createSdk(signer);
            const nested = await nestToken(owner_sdk, {
                address: owner_address,
>>>>>>> 96106bff792686a77d0fa1ea0a6f30a4d307768e
                parent: {
                    collectionId: 1619,
                    tokenId: land_token_id,
                },
                nested: {
                    collectionId: 1639,
                    tokenId: working_seed.seedbalance[1],
                }
            });
            console.log('nest token', nested);
            
            //set timestamp
            const date_time = Date.now();
            console.log(date_time);
            const _mnemonic = 'robot huge puzzle shoulder connect violin ensure able front umbrella learn harsh';
            const _adminAccount = await KeyringProvider.fromMnemonic(_mnemonic);
            const _adminSdk = new Sdk({
                baseUrl: 'https://rest.unique.network/opal/v1',
                signer: _adminAccount,
            });
            

            const args = {
                address: _adminAccount.address,
                collectionId: 1639,
                tokenId: working_seed.seedbalance[1],
                properties: [{
                    key: 'a.2',
                    value: date_time
                }]
            };
            const res = await _adminSdk.token.setProperties.submitWaitResult(args);
            console.log(res);

            const state_args = {
                address: _adminAccount.address,
                collectionId: 1639,
                tokenId: working_seed.seedbalance[1],
                properties: [{
                    key: 'a.1',
                    value: 0
                }]
            };
            const state_res = await _adminSdk.token.setProperties.submitWaitResult(state_args);
            console.log(state_res);
        }
    }

    //#fetch land collection
    let landCurrentRes = LandQuery(signer);
    console.log(landCurrentRes);
    if (landCurrentRes !== landLastRes) {
        setLandLastRes(landCurrentRes);
    }
    //#fetch seed collection
    let seedCurrentRes = SeedQuery(signer);
    //console.log(seedCurrentRes);
    if (seedCurrentRes !== seedLastRes) {
        setSeedLastRes(seedCurrentRes);
    }

    return(
        <>
        <div>
            <div>
                {haveSeedA &&
                    <div>
                        <h1>seed1</h1>
                        <button
<<<<<<< HEAD
                            onClick={() => burnNmintNnest_seed('A')}
                            className="text-2xl mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-400 shadow-lg shadow-amber-400/50 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:-translate-y-1 hover:scale-110 hover:bg-amber-600">
                                Plant carrot
=======
                            onClick={() => burnNmintNnest_seed('A')}>
                                Plant
>>>>>>> 96106bff792686a77d0fa1ea0a6f30a4d307768e
                        </button>
                    </div>
                }
            </div>
            <div>
                {haveSeedB &&
                    <div>
                        <h1>seed2</h1>
                        <button
<<<<<<< HEAD
                            onClick={() => burnNmintNnest_seed('B')}
                            className="text-2xl mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-400 shadow-lg shadow-amber-400/50 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:-translate-y-1 hover:scale-110 hover:bg-amber-600">
                                Plant strawberry
=======
                            onClick={() => burnNmintNnest_seed('B')}>
                                Plant
>>>>>>> 96106bff792686a77d0fa1ea0a6f30a4d307768e
                        </button>
                    </div>
                }
            </div>
            <div>
                {!haveSeedA && !haveSeedB &&
                    <div>
                        <h1>no seed</h1>
                    </div>
                }
            </div>
        </div>
        </>
    )
}