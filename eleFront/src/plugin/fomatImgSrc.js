// 格式化图片地址模块文件

/*
	图片数据原格式
		image_hash: "7e76a23eb90dada42528bc41499d6f8jpeg"
	实际请求的地址
		http://fuss10.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/
	格式化的部分(实际请求地址的中间部分)
		a/7b/b02bd836411c016935d258b300cfejpeg.jpeg
*/

function formatImgSrc(hash, size, auto) {
	if (!hash) return '';
	hash = hash.replace(/^(.{1})(.{2})(.+(jpeg|png))$/g, '$1/$2/$3.$4');
	size = size || 90;
	size = auto ? size : size + 'x' + size;
	return auto ? `//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/${size}x/` : `//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/!${size}r/gravity/Center/crop/${size}/`;
}

export default formatImgSrc;