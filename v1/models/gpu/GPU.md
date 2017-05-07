# GPU model

```
{
    "properties": {
        "apiVersion": {
            "major": mongoose.Schema.Types.Uint10,
            "minor": mongoose.Schema.Types.Uint10,
            "patch": mongoose.Schema.Types.Uint12
        },
        "driverVersion": {
            "major": mongoose.Schema.Types.Uint10,
            "minor": mongoose.Schema.Types.Uint10,
            "patch": mongoose.Schema.Types.Uint12
        },
        "vendorID": Number,
        "deviceID": Number,
        "deviceName": String,
        "deviceType": String,
        "pipelineCacheUUID": [Number],
        "limits": {
            "maxImageDimension1D": Number,
            "maxImageDimension2D": Number,
            "maxImageDimension3D": Number,
            [...]
            "optimalBufferCopyRowPitchAlignment": Number,
            "nonCoherentAtomSize": Number
        },
        "sparseProperties": {
            "residencyStandard2DBlockShape": Boolean,
            "residencyStandard2DMultisampleBlockShape": Boolean,
            "residencyStandard3DBlockShape": Boolean,
            "residencyAlignedMipSize": Boolean,
            "residencyNonResidentStrict": Boolean
        }
    },
    "features": {
        "robustBufferAccess": Boolean,
        "fullDrawIndexUint32": Boolean,
        "imageCubeArray": Boolean,
        [...]
        "inheritedQueries": Boolean
    },
    "memory": {
        "memoryTypeCount": Number,
        "memoryTypes": [{
            "heapIndex": Number,
            "propertyFlags": [String]
        }],
        "memoryHeapCount": Number,
        "memoryHeaps": [{
            "heapIndex": Number,
            "propertyFlags": [String]
        }]
    },
    "queues": [{
        "minImageTransferGranularity": {
            "depth": Number,
            "height": Number,
            "width": Number
        },
        "queueCount": Number,
        "queueFlags": [String],
        "timestampValidBits": Number
    }],
    "extensions": [{
        "extensionName": String,
        "specVersion": Number
    }],
    "formats": [mongoose.Schema.Types.Formats]
}
```

[Return to API doc](../../../README.md)
