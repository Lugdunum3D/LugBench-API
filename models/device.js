'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query')

require('../customTypes/uint12.js')(mongoose)
require('../customTypes/uint10.js')(mongoose)
require('../customTypes/formats.js')(mongoose)

const DeviceSchema = new mongoose.Schema({
  "name": String,
  "os": { type: String, enum: ['Windows', 'Linux', 'Android'] },
  "deviceId": Number,
  "vendorId": Number,
  "driverVersion": Number,
  "vulkanInfo": {
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
              "maxImageDimensionCube": Number,
              "maxImageArrayLayers": Number,
              "maxTexelBufferElements": Number,
              "maxUniformBufferRange": Number,
              "maxStorageBufferRange": Number,
              "maxPushConstantsSize": Number,
              "maxMemoryAllocationCount": Number,
              "maxSamplerAllocationCount": Number,
              "bufferImageGranularity": Number,
              "sparseAddressSpaceSize": Number,
              "maxBoundDescriptorSets": Number,
              "maxPerStageDescriptorSamplers": Number,
              "maxPerStageDescriptorUniformBuffers": Number,
              "maxPerStageDescriptorStorageBuffers": Number,
              "maxPerStageDescriptorSampledImages": Number,
              "maxPerStageDescriptorStorageImages": Number,
              "maxPerStageDescriptorInputAttachments": Number,
              "maxPerStageResources": Number,
              "maxDescriptorSetSamplers": Number,
              "maxDescriptorSetUniformBuffers": Number,
              "maxDescriptorSetUniformBuffersDynamic": Number,
              "maxDescriptorSetStorageBuffers": Number,
              "maxDescriptorSetStorageBuffersDynamic": Number,
              "maxDescriptorSetSampledImages": Number,
              "maxDescriptorSetStorageImages": Number,
              "maxDescriptorSetInputAttachments": Number,
              "maxVertexInputAttributes": Number,
              "maxVertexInputBindings": Number,
              "maxVertexInputAttributeOffset": Number,
              "maxVertexInputBindingStride": Number,
              "maxVertexOutputComponents": Number,
              "maxTessellationGenerationLevel": Number,
              "maxTessellationPatchSize": Number,
              "maxTessellationControlPerVertexInputComponents": Number,
              "maxTessellationControlPerVertexOutputComponents": Number,
              "maxTessellationControlPerPatchOutputComponents": Number,
              "maxTessellationControlTotalOutputComponents": Number,
              "maxTessellationEvaluationInputComponents": Number,
              "maxTessellationEvaluationOutputComponents": Number,
              "maxGeometryShaderInvocations": Number,
              "maxGeometryInputComponents": Number,
              "maxGeometryOutputComponents": Number,
              "maxGeometryOutputVertices": Number,
              "maxGeometryTotalOutputComponents": Number,
              "maxFragmentInputComponents": Number,
              "maxFragmentOutputAttachments": Number,
              "maxFragmentDualSrcAttachments": Number,
              "maxFragmentCombinedOutputResources": Number,
              "maxComputeSharedMemorySize": Number,
              "maxComputeWorkGroupCount": [Number],
              "maxComputeWorkGroupInvocations": Number,
              "maxComputeWorkGroupSize": [Number],
              "subPixelPrecisionBits": Number,
              "subTexelPrecisionBits": Number,
              "mipmapPrecisionBits": Number,
              "maxDrawIndexedIndexValue": Number,
              "maxDrawIndirectCount": Number,
              "maxSamplerLodBias": Number,
              "maxSamplerAnisotropy": Number,
              "maxViewports": Number,
              "maxViewportDimensions": [Number],
              "viewportBoundsRange": [Number],
              "viewportSubPixelBits": Number,
              "minMemoryMapAlignment": Number,
              "minTexelBufferOffsetAlignment": Number,
              "minUniformBufferOffsetAlignment": Number,
              "minStorageBufferOffsetAlignment": Number,
              "minTexelOffset": Number,
              "maxTexelOffset": Number,
              "minTexelGatherOffset": Number,
              "maxTexelGatherOffset": Number,
              "minInterpolationOffset": Number,
              "maxInterpolationOffset": Number,
              "subPixelInterpolationOffsetBits": Number,
              "maxFramebufferWidth": Number,
              "maxFramebufferHeight": Number,
              "maxFramebufferLayers": Number,
              "framebufferColorSampleCounts": [String],
              "framebufferDepthSampleCounts": [String],
              "framebufferStencilSampleCounts": [String],
              "framebufferNoAttachmentsSampleCounts": [String],
              "maxColorAttachments": Number,
              "sampledImageColorSampleCounts": [String],
              "sampledImageIntegerSampleCounts": [String],
              "sampledImageDepthSampleCounts": [String],
              "sampledImageStencilSampleCounts": [String],
              "storageImageSampleCounts": [String],
              "maxSampleMaskWords": Number,
              "timestampComputeAndGraphics": Boolean,
              "timestampPeriod": Number,
              "maxClipDistances": Number,
              "maxCullDistances": Number,
              "maxCombinedClipAndCullDistances": Number,
              "discreteQueuePriorities": Number,
              "pointSizeRange": [Number],
              "lineWidthRange": [Number],
              "pointSizeGranularity": Number,
              "lineWidthGranularity": Number,
              "strictLines": Boolean,
              "standardSampleLocations": Boolean,
              "optimalBufferCopyOffsetAlignment": Number,
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
          "independentBlend": Boolean,
          "geometryShader": Boolean,
          "tessellationShader": Boolean,
          "sampleRateShading": Boolean,
          "dualSrcBlend": Boolean,
          "logicOp": Boolean,
          "multiDrawIndirect": Boolean,
          "drawIndirectFirstInstance": Boolean,
          "depthClamp": Boolean,
          "depthBiasClamp": Boolean,
          "fillModeNonSolid": Boolean,
          "depthBounds": Boolean,
          "wideLines": Boolean,
          "largePoints": Boolean,
          "alphaToOne": Boolean,
          "multiViewport": Boolean,
          "samplerAnisotropy": Boolean,
          "textureCompressionETC2": Boolean,
          "textureCompressionASTC_LDR": Boolean,
          "textureCompressionBC": Boolean,
          "occlusionQueryPrecise": Boolean,
          "pipelineStatisticsQuery": Boolean,
          "vertexPipelineStoresAndAtomics": Boolean,
          "fragmentStoresAndAtomics": Boolean,
          "shaderTessellationAndGeometryPointSize": Boolean,
          "shaderImageGatherExtended": Boolean,
          "shaderStorageImageExtendedFormats": Boolean,
          "shaderStorageImageMultisample": Boolean,
          "shaderStorageImageReadWithoutFormat": Boolean,
          "shaderStorageImageWriteWithoutFormat": Boolean,
          "shaderUniformBufferArrayDynamicIndexing": Boolean,
          "shaderSampledImageArrayDynamicIndexing": Boolean,
          "shaderStorageBufferArrayDynamicIndexing": Boolean,
          "shaderStorageImageArrayDynamicIndexing": Boolean,
          "shaderClipDistance": Boolean,
          "shaderCullDistance": Boolean,
          "shaderFloat64": Boolean,
          "shaderInt64": Boolean,
          "shaderInt16": Boolean,
          "shaderResourceResidency": Boolean,
          "shaderResourceMinLod": Boolean,
          "sparseBinding": Boolean,
          "sparseResidencyBuffer": Boolean,
          "sparseResidencyImage2D": Boolean,
          "sparseResidencyImage3D": Boolean,
          "sparseResidency2Samples": Boolean,
          "sparseResidency4Samples": Boolean,
          "sparseResidency8Samples": Boolean,
          "sparseResidency16Samples": Boolean,
          "sparseResidencyAliased": Boolean,
          "variableMultisampleRate": Boolean,
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
});

DeviceSchema.index({
  "name": 1,
  "os": 1,
  "deviceId": 1,
  "vendorId": 1,
  "driverVersion": 1
}, { unique: true })

DeviceSchema.plugin(mongooseApiQuery)

const Device = mongoose.model('Device', DeviceSchema)
module.exports = Device