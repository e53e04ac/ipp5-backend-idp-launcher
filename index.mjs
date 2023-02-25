/*!
    @e53e04ac/ipp5-backend-idp-launcher/index.mjs
    Copyright (C) @e53e04ac
    MIT License
*/

import { AzureTerraformer } from 'azure-terraformer';
import { EventEmitter } from 'event-emitter';
import { FileEntry } from 'file-entry-native';
import { hold } from 'hold';
import { unwrap } from 'hold';

/** @type {import('.').Ipp5BackendIdpLauncher.Constructor} */
const constructor = ((options) => {

    const _options = ({
        az: hold(() => {
            return unwrap(options.az);
        }),
        docker: hold(() => {
            return unwrap(options.docker);
        }),
        tmpDirectory: hold(() => {
            return unwrap(options.tmpDirectory);
        }),
        launchId: hold(() => {
            return unwrap(options.launchId);
        }),
        containerImageName: hold(() => {
            return unwrap(options.containerImageName);
        }),
        containerTimezoneId: hold(() => {
            return unwrap(options.containerTimezoneId);
        }),
        containerAppPort: hold(() => {
            return unwrap(options.containerAppPort);
        }),
        acrSubscription: hold(() => {
            return unwrap(options.acrSubscription);
        }),
        acrName: hold(() => {
            return unwrap(options.acrName);
        }),
        webappSubscription: hold(() => {
            return unwrap(options.webappSubscription);
        }),
        webappResourceGroup: hold(() => {
            return unwrap(options.webappResourceGroup);
        }),
        webappName: hold(() => {
            return unwrap(options.webappName);
        }),
        webappDeploymentContainerImageName: hold(() => {
            return unwrap(options.webappDeploymentContainerImageName);
        }),
        backendIdpHttpPathPrefix: hold(() => {
            return unwrap(options.backendIdpHttpPathPrefix);
        }),
        backendIdpRegisterUrn: hold(() => {
            return unwrap(options.backendIdpRegisterUrn);
        }),
        backendIdpRegisterPrivateKey: hold(() => {
            return unwrap(options.backendIdpRegisterPrivateKey);
        }),
        backendIdpRegisterPublicKey: hold(() => {
            return unwrap(options.backendIdpRegisterPublicKey);
        }),
        backendIdpChallengeTokenUrn: hold(() => {
            return unwrap(options.backendIdpChallengeTokenUrn);
        }),
        backendIdpChallengeTokenPrivateKey: hold(() => {
            return unwrap(options.backendIdpChallengeTokenPrivateKey);
        }),
        backendIdpChallengeTokenPublicKey: hold(() => {
            return unwrap(options.backendIdpChallengeTokenPublicKey);
        }),
        backendIdpTokenUrn: hold(() => {
            return unwrap(options.backendIdpTokenUrn);
        }),
        backendIdpTokenPrivateKey: hold(() => {
            return unwrap(options.backendIdpTokenPrivateKey);
        }),
        backendIdpStorageAccountName: hold(() => {
            return unwrap(options.backendIdpStorageAccountName);
        }),
        backendApiUrn: hold(() => {
            return unwrap(options.backendApiUrn);
        }),
    });

    /** @type {import('.').Ipp5BackendIdpLauncher._Self} */
    const _self = ({
        options: (() => {
            return options;
        }),
        _options: (() => {
            return _options;
        }),
        scriptFile: hold(() => {
            return FileEntry.fromFileUrl(import.meta.url);
        }),
        scriptDirectory: hold(() => {
            return _self.scriptFile().parent();
        }),
        runDirectory: hold(() => {
            return _options.tmpDirectory().resolve(_options.launchId());
        }),
        settingsJson: hold(() => {
            return _self.runDirectory().resolve('settings.json');
        }),
        azureTerraformer: hold(() => {
            return AzureTerraformer({});
        }),
        makeSettingsJson: hold(async () => {
            await _self.azureTerraformer().createJsonFileFromMap({
                destination: _self.settingsJson(),
                /** @type {import('.').Ipp5BackendIdpLauncher.EnvMap} */
                map: {
                    TZ: _options.containerTimezoneId(),
                    WEBSITES_PORT: _options.containerAppPort(),
                    CUSTOM_BACKEND_IDP_HTTP_PATH_PREFIX: _options.backendIdpHttpPathPrefix(),
                    CUSTOM_BACKEND_IDP_REGISTER_URN: _options.backendIdpRegisterUrn(),
                    CUSTOM_BACKEND_IDP_REGISTER_PRIVATE_KEY: _options.backendIdpRegisterPrivateKey(),
                    CUSTOM_BACKEND_IDP_REGISTER_PUBLIC_KEY: _options.backendIdpRegisterPublicKey(),
                    CUSTOM_BACKEND_IDP_CHALLENGE_TOKEN_URN: _options.backendIdpChallengeTokenUrn(),
                    CUSTOM_BACKEND_IDP_CHALLENGE_TOKEN_PRIVATE_KEY: _options.backendIdpChallengeTokenPrivateKey(),
                    CUSTOM_BACKEND_IDP_CHALLENGE_TOKEN_PUBLIC_KEY: _options.backendIdpChallengeTokenPublicKey(),
                    CUSTOM_BACKEND_IDP_TOKEN_URN: _options.backendIdpTokenUrn(),
                    CUSTOM_BACKEND_IDP_TOKEN_PRIVATE_KEY: _options.backendIdpTokenPrivateKey(),
                    CUSTOM_BACKEND_IDP_STORAGE_ACCOUNT_NAME: _options.backendIdpStorageAccountName(),
                    CUSTOM_BACKEND_API_URN: _options.backendApiUrn(),
                    CUSTOM_EXPRESS_ENV: 'production',
                    CUSTOM_EXPRESS_SUBDOMAIN_OFFSET: 2,
                    CUSTOM_EXPRESS_TRUST_PROXY: 'loopback, linklocal, uniquelocal',
                },
                space: 4,
            });
        }),
        runAzAcrLogin: hold(async () => {
            await _self.azureTerraformer().azAcrLogin({
                az: _options.az(),
                subscription: _options.acrSubscription(),
                name: _options.acrName(),
            });
        }),
        runDockerImageTag: hold(async () => {
            await _self.azureTerraformer().dockerImageTag({
                docker: _options.docker(),
                sourceImage: _options.containerImageName(),
                targetImage: _options.webappDeploymentContainerImageName(),
            });
        }),
        runDockerImagePush: hold(async () => {
            await _self.azureTerraformer().dockerImagePush({
                docker: _options.docker(),
                name: _options.webappDeploymentContainerImageName(),
            });
        }),
        runAzWebappConfigAppsettingsSet: hold(async () => {
            await _self.azureTerraformer().azWebappConfigAppsettingsSet({
                az: _options.az(),
                subscription: _options.webappSubscription(),
                resourceGroup: _options.webappResourceGroup(),
                name: _options.webappName(),
                settings: _self.settingsJson(),
            });
        }),
        runAzWebappRestart: hold(async () => {
            await _self.azureTerraformer().azWebappRestart({
                az: _options.az(),
                subscription: _options.webappSubscription(),
                resourceGroup: _options.webappResourceGroup(),
                name: _options.webappName(),
            });
        }),
    });

    /** @type {import('.').Ipp5BackendIdpLauncher.Self} */
    const self = ({
        ...EventEmitter({}),
        _Ipp5BackendIdpLauncher: (() => {
            return _self;
        }),
        launch: hold(async () => {
            await _self.makeSettingsJson();
            await _self.runAzAcrLogin();
            await _self.runDockerImageTag();
            await _self.runDockerImagePush();
            await _self.runAzWebappConfigAppsettingsSet();
            await _self.runAzWebappRestart();
        }),
    });

    return self;

});

/** @type {import('.').Ipp5BackendIdpLauncher.Companion} */
const companion = ({});

/** @type {import('.').Ipp5BackendIdpLauncher.ConstructorWithCompanion} */
const constructorWithCompanion = Object.assign(constructor, companion);

export { constructorWithCompanion as Ipp5BackendIdpLauncher };
