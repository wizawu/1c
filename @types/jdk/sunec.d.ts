declare namespace sun {
    namespace security {
        namespace ec {
            class SunEC extends java.security.Provider {
                public constructor()
            }
            class SunECEntries {
                static putEntries(arg0: java.util.Map<java.lang.Object, java.lang.Object>, arg1: boolean): void
            }
            class ECPrivateKeyImpl extends sun.security.pkcs.PKCS8Key implements java.security.interfaces.ECPrivateKey {
                public constructor(arg0: byte[])
                public constructor(arg0: java.math.BigInteger, arg1: java.security.spec.ECParameterSpec)
                public getAlgorithm(): string
                public getS(): java.math.BigInteger
                public getParams(): java.security.spec.ECParameterSpec
                protected parseKeyBits(): void
            }
            class ECPublicKeyImpl extends sun.security.x509.X509Key implements java.security.interfaces.ECPublicKey {
                public constructor(arg0: java.security.spec.ECPoint, arg1: java.security.spec.ECParameterSpec)
                public constructor(arg0: byte[])
                public getAlgorithm(): string
                public getW(): java.security.spec.ECPoint
                public getParams(): java.security.spec.ECParameterSpec
                public getEncodedPublicValue(): byte[]
                protected parseKeyBits(): void
                public toString(): string
                protected writeReplace(): java.lang.Object
            }
            class ECKeyPairGenerator extends java.security.KeyPairGeneratorSpi {
                public constructor()
                public initialize(arg0: int, arg1: java.security.SecureRandom): void
                public initialize(arg0: java.security.spec.AlgorithmParameterSpec, arg1: java.security.SecureRandom): void
                public generateKeyPair(): java.security.KeyPair
            }
            class ECParameters extends java.security.AlgorithmParametersSpi {
                static getAlgorithmParameters(arg0: java.security.spec.ECParameterSpec): java.security.AlgorithmParameters
                public constructor()
                protected engineInit(arg0: java.security.spec.AlgorithmParameterSpec): void
                protected engineInit(arg0: byte[]): void
                protected engineInit(arg0: byte[], arg1: string): void
                protected engineGetParameterSpec<T extends java.security.spec.AlgorithmParameterSpec>(arg0: java.lang.Class<T>): T
                protected engineGetEncoded<T extends java.security.spec.AlgorithmParameterSpec>(): byte[]
                protected engineGetEncoded<T extends java.security.spec.AlgorithmParameterSpec>(arg0: string): byte[]
                protected engineToString<T extends java.security.spec.AlgorithmParameterSpec>(): string
            }
            class NamedCurve extends java.security.spec.ECParameterSpec {
                constructor(arg0: string, arg1: string, arg2: java.security.spec.EllipticCurve, arg3: java.security.spec.ECPoint, arg4: java.math.BigInteger, arg5: int)
                getName(): string
                getEncoded(): byte[]
                getObjectId(): string
                public toString(): string
            }
            class CurveDB {
                static SPLIT_PATTERN: string
                public constructor()
                static getSupportedCurves(): java.util.Collection<sun.security.ec.NamedCurve>
                static lookup(arg0: string): sun.security.ec.NamedCurve
                static lookup(arg0: int): sun.security.ec.NamedCurve
                static lookup(arg0: java.security.spec.ECParameterSpec): sun.security.ec.NamedCurve
            }
            class ECKeyFactory extends java.security.KeyFactorySpi {
                public constructor()
                public static toECKey(arg0: java.security.Key): java.security.interfaces.ECKey
                protected engineTranslateKey(arg0: java.security.Key): java.security.Key
                protected engineGeneratePublic(arg0: java.security.spec.KeySpec): java.security.PublicKey
                protected engineGeneratePrivate(arg0: java.security.spec.KeySpec): java.security.PrivateKey
                protected engineGetKeySpec<T extends java.security.spec.KeySpec>(arg0: java.security.Key, arg1: java.lang.Class<T>): T
            }
            class ECDHKeyAgreement extends javax.crypto.KeyAgreementSpi {
                public constructor()
                protected engineInit(arg0: java.security.Key, arg1: java.security.SecureRandom): void
                protected engineInit(arg0: java.security.Key, arg1: java.security.spec.AlgorithmParameterSpec, arg2: java.security.SecureRandom): void
                protected engineDoPhase(arg0: java.security.Key, arg1: boolean): java.security.Key
                protected engineGenerateSecret(): byte[]
                protected engineGenerateSecret(arg0: byte[], arg1: int): int
                protected engineGenerateSecret(arg0: string): javax.crypto.SecretKey
            }
            abstract class ECDSASignature extends java.security.SignatureSpi {
                constructor()
                constructor(arg0: string)
                protected engineInitVerify(arg0: java.security.PublicKey): void
                protected engineInitSign(arg0: java.security.PrivateKey): void
                protected engineInitSign(arg0: java.security.PrivateKey, arg1: java.security.SecureRandom): void
                protected resetDigest(): void
                protected getDigestValue(): byte[]
                protected engineUpdate(arg0: byte): void
                protected engineUpdate(arg0: byte[], arg1: int, arg2: int): void
                protected engineUpdate(arg0: java.nio.ByteBuffer): void
                protected engineSign(): byte[]
                protected engineVerify(arg0: byte[]): boolean
                protected engineSetParameter(arg0: string, arg1: java.lang.Object): void
                protected engineGetParameter(arg0: string): java.lang.Object
            }
        }
    }
}
