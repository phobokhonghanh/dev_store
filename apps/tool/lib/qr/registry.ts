import {
    EmailBuilder,
    EventBuilder,
    LocationBuilder,
    PaymentBuilder,
    QRParamBuilder,
    SmsBuilder,
    TextBuilder,
    UrlBuilder,
    VCardBuilder,
    WifiBuilder,
} from './builders'

/**
 * Registry that maps QR types to their parameter builders.
 * Singleton pattern for efficient reuse.
 */
export class QRBuilderRegistry {
    private static instance: QRBuilderRegistry
    private builders: Map<string, QRParamBuilder>

    private constructor() {
        this.builders = new Map()
        this.registerDefaults()
    }

    static getInstance(): QRBuilderRegistry {
        if (!QRBuilderRegistry.instance) {
            QRBuilderRegistry.instance = new QRBuilderRegistry()
        }
        return QRBuilderRegistry.instance
    }

    private registerDefaults(): void {
        const defaultBuilders: QRParamBuilder[] = [
            new UrlBuilder(),
            new WifiBuilder(),
            new PaymentBuilder(),
            new VCardBuilder(),
            new EmailBuilder(),
            new SmsBuilder(),
            new EventBuilder(),
            new LocationBuilder(),
        ]

        defaultBuilders.forEach(builder => this.builders.set(builder.type, builder))
    }

    getBuilder(type: string): QRParamBuilder {
        return this.builders.get(type) || new TextBuilder()
    }

    register(builder: QRParamBuilder): void {
        this.builders.set(builder.type, builder)
    }
}
