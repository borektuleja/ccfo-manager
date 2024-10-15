export type ControllerComponent = React.ComponentType<{
	controller: IController;
}>;
export type ControllerComponentProps =
	React.ComponentProps<ControllerComponent>;

export interface IController {
	clearInvocations(): void;
	set loadingComponent(component: ControllerComponent);
	nextState(component: ControllerComponent): void;
	set successComponent(component: ControllerComponent);
	nextSuccess(component?: ControllerComponent): void;
	set errorComponent(component: ControllerComponent);
	nextError(component?: ControllerComponent): void;

	get onLoading(): boolean;
	get onLoadingComponent(): React.ReactNode;
	get onSuccess(): boolean;
	get onSuccessComponent(): React.ReactNode;
	get onError(): boolean;
	get onErrorComponent(): React.ReactNode;
}
