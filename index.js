var assets = {
	config: {},
	tasks: require('require-dir')('./tasks'),
	watches: []
};

module.exports = function(assetsDir, publicDir, prepare, g) {
	// prepare initial configuration object
	assets.config = require('./config')(assetsDir, publicDir);

	if (typeof g !== 'undefined')
	{
		/**
		 * When using npm link for testing, node modules become duplicated (including gulp). Because of this, gulp fails
		 * to run correctly - it sees the gulp installation in the project, but it also sees a separate gulp installation
		 * in this package. Therefore, this package ends up adding tasks to its own gulp instance, and gulp does not
		 * see these tasks, because it's looking at the gulp instance from the project.
		 *
		 * To combat this, we allow the project to pass in its own gulp instance to overwrite ours. If npm link was used,
		 * this resolves the issue with the duplicate gulp package. If npm link was not used, then the project's gulp instance
		 * will match our gulp instance regardless, so this assignment will be harmless.
		 */
		this.gulp = g;
	}
	else
	{
		this.gulp = require('gulp');
	}

	if (typeof prepare === 'function')
	{
		prepare.call(assets);
	}

	var tasks = assets.tasks;

	for (var field in tasks)
	{
		if (!tasks.hasOwnProperty(field))
		{
			continue;
		}

		var task = tasks[field];

		if (typeof task === 'function')
		{
			task.call(assets);
		}
	}
};
