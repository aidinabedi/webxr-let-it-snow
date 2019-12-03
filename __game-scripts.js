var LetItSnow = pc.createScript("letItSnow");
LetItSnow.attributes.add("originalEntity", {
	type: "entity"
}), LetItSnow.attributes.add("maxEntities", {
	type: "number",
	default: 100
}), LetItSnow.attributes.add("emitRate", {
	type: "number",
	default: 10
}), LetItSnow.prototype.initialize = function () {
	this.timeSinceEmit = 0, this.entities = []
}, LetItSnow.prototype.update = function (t) {
	this.timeSinceEmit += t, this.timeSinceEmit * this.emitRate > 1 && (this.timeSinceEmit = 0, this.emit())
}, LetItSnow.prototype.emit = function () {
	if (this.originalEntity) {
		var t = this.originalEntity.clone();
		this.app.root.addChild(t);
		var i = this.entity.getPosition(),
			e = this.entity.getRotation();
		t.setPosition(i), t.setRotation(e);
		var n = new pc.Vec3;
		n.x = Math.random() - .5, n.y = Math.random(), n.z = Math.random() - 10;
		var o = new pc.Vec3;
		for (o.x = 2 * Math.random(), o.y = 0, o.z = Math.random() - .5, t.rigidbody.linearVelocity = e.transformVector(n), t.rigidbody.angularVelocity = e.transformVector(o), t.enabled = !0; this.entities.length > this.maxEntities - 1;) {
			this.entities.pop().destroy()
		}
		this.entities.unshift(t)
	}
};