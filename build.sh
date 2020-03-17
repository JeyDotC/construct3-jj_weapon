version_json=$(grep '"version":' src/addon.json | xargs)
version_number=${version_json#'version: '}
version_number=${version_number%'"'}
version_number=${version_number%','}
addon_name="jj_weapon"

echo "Building ${addon_name} version ${version_number}";

[[ -d build ]] && rm -r build

echo "Creating directory structure...";

mkdir "./build"

echo "Copying files...";

# cp info.xml "./build/$addon_name-$version_number"
cp -r "./src" "./build"

mv "./build/src" "./build/$addon_name-$version_number"

echo "Building .c3addon file...";

powershell Compress-Archive "build/$addon_name-$version_number/*" "build/$addon_name-$version_number.zip"

mv "./build/$addon_name-$version_number.zip" "./build/$addon_name-$version_number.c3addon" 

echo "DONE";