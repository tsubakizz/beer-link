CREATE TABLE `beer_favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`beer_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`beer_id`) REFERENCES `beers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `beer_favorites_user_id_idx` ON `beer_favorites` (`user_id`);--> statement-breakpoint
CREATE INDEX `beer_favorites_beer_id_idx` ON `beer_favorites` (`beer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `beer_favorites_user_beer_unique_idx` ON `beer_favorites` (`user_id`,`beer_id`);--> statement-breakpoint
CREATE TABLE `beer_style_other_names` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`style_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`style_id`) REFERENCES `beer_styles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `beer_style_other_names_style_id_idx` ON `beer_style_other_names` (`style_id`);--> statement-breakpoint
CREATE TABLE `beer_style_relations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`style_id` integer NOT NULL,
	`related_style_id` integer NOT NULL,
	`relation_type` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`style_id`) REFERENCES `beer_styles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`related_style_id`) REFERENCES `beer_styles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `beer_style_relations_style_id_idx` ON `beer_style_relations` (`style_id`);--> statement-breakpoint
CREATE INDEX `beer_style_relations_related_style_id_idx` ON `beer_style_relations` (`related_style_id`);--> statement-breakpoint
CREATE TABLE `beer_styles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`bitterness` integer DEFAULT 0 NOT NULL,
	`sweetness` integer DEFAULT 0 NOT NULL,
	`body` integer DEFAULT 0 NOT NULL,
	`aroma` integer DEFAULT 0 NOT NULL,
	`sourness` integer DEFAULT 0 NOT NULL,
	`history` text DEFAULT '' NOT NULL,
	`origin` text DEFAULT '' NOT NULL,
	`abv_min` real DEFAULT 0 NOT NULL,
	`abv_max` real DEFAULT 0 NOT NULL,
	`ibu_min` integer DEFAULT 0 NOT NULL,
	`ibu_max` integer DEFAULT 0 NOT NULL,
	`srm_min` integer DEFAULT 0 NOT NULL,
	`srm_max` integer DEFAULT 0 NOT NULL,
	`serving_temp_min` integer DEFAULT 0 NOT NULL,
	`serving_temp_max` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `beer_styles_slug_unique` ON `beer_styles` (`slug`);--> statement-breakpoint
CREATE INDEX `beer_styles_slug_idx` ON `beer_styles` (`slug`);--> statement-breakpoint
CREATE TABLE `beers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`brewery_id` integer NOT NULL,
	`style_id` integer NOT NULL,
	`abv` real NOT NULL,
	`ibu` integer,
	`image_url` text,
	`rating` real,
	`review_count` integer DEFAULT 0 NOT NULL,
	`prefecture_id` integer,
	`country_id` integer NOT NULL,
	`official_url` text,
	`source_url` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`brewery_id`) REFERENCES `breweries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`style_id`) REFERENCES `beer_styles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`prefecture_id`) REFERENCES `prefectures`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `beers_brewery_id_idx` ON `beers` (`brewery_id`);--> statement-breakpoint
CREATE INDEX `beers_style_id_idx` ON `beers` (`style_id`);--> statement-breakpoint
CREATE INDEX `beers_prefecture_id_idx` ON `beers` (`prefecture_id`);--> statement-breakpoint
CREATE INDEX `beers_country_id_idx` ON `beers` (`country_id`);--> statement-breakpoint
CREATE TABLE `breweries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`name_en` text,
	`type` integer NOT NULL,
	`prefecture_id` integer,
	`country_id` integer NOT NULL,
	`website` text,
	`image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`prefecture_id`) REFERENCES `prefectures`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `breweries_slug_unique` ON `breweries` (`slug`);--> statement-breakpoint
CREATE INDEX `breweries_slug_idx` ON `breweries` (`slug`);--> statement-breakpoint
CREATE INDEX `breweries_prefecture_id_idx` ON `breweries` (`prefecture_id`);--> statement-breakpoint
CREATE INDEX `breweries_country_id_idx` ON `breweries` (`country_id`);--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE INDEX `countries_name_idx` ON `countries` (`name`);--> statement-breakpoint
CREATE TABLE `prefectures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prefectures_name_unique` ON `prefectures` (`name`);--> statement-breakpoint
CREATE INDEX `prefectures_name_idx` ON `prefectures` (`name`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`beer_id` integer NOT NULL,
	`beer_name` text NOT NULL,
	`user_id` integer NOT NULL,
	`user_name` text NOT NULL,
	`user_profile_image_url` text,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`beer_id`) REFERENCES `beers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reviews_beer_id_idx` ON `reviews` (`beer_id`);--> statement-breakpoint
CREATE INDEX `reviews_user_id_idx` ON `reviews` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firebase_uid` text NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`bio` text,
	`profile_image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_firebase_uid_unique` ON `users` (`firebase_uid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_firebase_uid_idx` ON `users` (`firebase_uid`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);