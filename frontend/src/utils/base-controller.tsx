import { type Signal, signal } from "@preact/signals-react";

import type { ControllerComponent, IController } from "./controller";

export class BaseController implements IController {
	private _onLoading: Signal<boolean> = signal(false);
	private _onLoadingComponent: Signal<ControllerComponent | null> =
		signal(null);
	private _onSuccess: Signal<boolean> = signal(false);
	private _onSuccessComponent: Signal<ControllerComponent | null> =
		signal(null);
	private _onError: Signal<boolean> = signal(false);
	private _onErrorComponent: Signal<ControllerComponent | null> = signal(null);

	public clearInvocations(): void {
		// Clear all invocations on the controller.
		this._onSuccess.value = false;
		this._onError.value = false;
	}

	public set loadingComponent(component: ControllerComponent) {
		this._onLoadingComponent.value = component;
	}

	public nextState(component?: ControllerComponent): void {
		// Assign loading component.
		if (component) this._onLoadingComponent.value = component;

		// Invert the state of the controller.
		this._onLoading.value = !this._onLoading.value;
	}

	public set successComponent(component: ControllerComponent) {
		this._onSuccessComponent.value = component;
	}

	public nextSuccess(component?: ControllerComponent): void {
		// Assign the success component.
		if (component) this._onSuccessComponent.value = component;

		// Invoke success.
		this._onSuccess.value = true;
	}

	public set errorComponent(component: ControllerComponent) {
		this._onErrorComponent.value = component;
	}

	public nextError(component?: ControllerComponent): void {
		// Assign the error component.
		if (component) this._onErrorComponent.value = component;

		// Invoke error.
		this._onError.value = true;
	}

	public get onLoading(): boolean {
		return this._onLoading.value;
	}

	public get onLoadingComponent(): React.ReactNode {
		// Do not render if no loading component was provided.
		if (this._onLoadingComponent.value === null) return null;

		// Instantiate the loading component.
		const Component = this._onLoadingComponent.value;
		// Render the loading component.
		return <Component controller={this} />;
	}

	public get onSuccess(): boolean {
		return this._onSuccess.value;
	}

	public get onSuccessComponent(): React.ReactNode {
		// Do not render if no success component was provided.
		if (this._onSuccessComponent.value === null) return null;

		// Instantiate the success component.
		const Component = this._onSuccessComponent.value;
		// Render the success component.
		return <Component controller={this} />;
	}

	public get onError(): boolean {
		return this._onError.value;
	}

	public get onErrorComponent(): React.ReactNode {
		// Do not render if no error component was provided.
		if (this._onErrorComponent.value === null) return null;

		// Instantiate the error component.
		const Component = this._onErrorComponent.value;
		// Render the error component.
		return <Component controller={this} />;
	}
}
