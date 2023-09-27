APP_STL := gnustl_static
# 从 Android NDK r17 开始，NDK 不再支持 gnustl，而是推荐使用 c++_static 或 c++_shared。你需要将项目的 APP_STL 值从 gnustl_static 更改为 c++_static 或 c++_shared。
# APP_STL := c++_shared

# Uncomment this line to compile to armeabi-v7a, your application will run faster but support less devices
# 从 Android NDK r17 开始，NDK 不再支持 armeabi，而是推荐使用 armeabi-v7a。你需要将项目的 ABI 从 armeabi 更改为 armeabi-v7a。
# APP_ABI := armeabi-v7a

# APP_PLATFORM := android-29

# APP_BUILD_SCRIPT := jni/Android.mk

APP_CPPFLAGS := -frtti -DCC_ENABLE_CHIPMUNK_INTEGRATION=1 -std=c++11 -fsigned-char
APP_LDFLAGS := -latomic

USE_ARM_MODE := 1

ifeq ($(NDK_DEBUG),1)
  APP_CPPFLAGS += -DCOCOS2D_DEBUG=1
  APP_OPTIM := debug
else
  APP_CPPFLAGS += -DNDEBUG
  APP_OPTIM := release
endif

